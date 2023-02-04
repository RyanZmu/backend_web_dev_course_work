const fs = require('fs'); // fs (filesysten) module - will return an object of functions of this module, stored in this variable
const http = require('http') // call http module for networking capabilities
const url = require('url') // url module for routing

//Below are Blocking code blocks, using sync instead of async
// const textin = fs.readFileSync('/home/ryan/development_projects/backend_web_dev/complete-node-bootcamp/1-node-farm/starter/txt/input.txt', 'utf-8');
// console.log(textin); // contents of the file will now be displayed when code is ran

// // below we will write textOut to a file (new file in this case)
// const textOut = `This is what we know about the avocado: ${textin}.\n Created on ${Date.now()}`;
// fs.writeFileSync('/home/ryan/development_projects/backend_web_dev/complete-node-bootcamp/1-node-farm/starter/txt/output.txt', textOut);
// console.log('File written');
// //

// // Async examples, node.js prefers Async functions, using callback functions. This is async version over the above code
// fs.readFile('/home/ryan/development_projects/backend_web_dev/complete-node-bootcamp/1-node-farm/starter/txt/input.txt', 'utf-8',(err,data) => {
//     console.log(data);
// });
//


//Non-blocking, async away - err first mostly in node.js
// fs.readFile('/home/ryan/development_projects/backend_web_dev/complete-node-bootcamp/1-node-farm/starter/txt/start.txt','utf-8',(err,data1) => { //data one result is read-this
//     if (err) return console.log(`Oh no!: ${err}`) // error handling

//     fs.readFile(`/home/ryan/development_projects/backend_web_dev/complete-node-bootcamp/1-node-farm/starter/txt/${data1}.txt`,'utf-8',(err,data2) => {
//         console.log(data2); //data2 reads the text in read-this.txt
//         fs.readFile('/home/ryan/development_projects/backend_web_dev/complete-node-bootcamp/1-node-farm/starter/txt/append.txt','utf-8',(err,data3) => {
//             console.log(data3);

//             fs.writeFile('./starter/txt/final.txt',`${data2}\n${data3}`,'utf-8', err => {
//                 console.log('your file has been written'); //writes data2 and data3 to final.txt file
//             })
//         });
//     });
// });
// console.log('this gets read first, it is sync and not async!');
//above is callback hell, will learn promises in future to make it less complicated


// going to use readFileSync because it is ok to have this run and block this code, since it is only read once and immediatey upon page load - top level code. Code that runs once and not over and over again, can be sync instead of async

// SERVER- has req,res like a fetch
// Calling templates and filling them in is better than creating multiple requesrs
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');// use node's builtin __dirname variable instead of '.' because it is usin the dir the script is ran from. Exception being the require functions where '.' means current dir like usual. node the '.' means where the script is RAN FROM.
const dataObj = JSON.parse(data);

const replaceTemplate = (temp,product) => { //product = object
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);// good point made, instead of just doing temp.replace, it is best practice to not manipulate the arument var directly and instead put it in a new var and then work on it.
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.orgranic) {
     output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic'); //passes this to the temp and  changes the div to class, not organic and hides the organic image
     return output;
     }
    return output
}


const server = http.createServer((req, res) =>  {
    const {query, pathname} = url.parse(req.url, true); //creates two identical objs

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
        console.log(output);
        res.end(output);

    // Product page
    }else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output);

    // API
    }else if(pathname === '/api') {
    res.writeHead(200, {'Content-type': 'application/json'}) //tell server we are sending json data
    res.end(data);

    // Not found
    }else {
        res.writeHead(404, { //second argument is an object of Headers, in this case for a 404 error
            'Content-type': 'text/html',
            'my-own-header': 'hello-world', //headers can be custom, pretty cool
        })
        res.end(`<h1>Page could not be found</h1>`);
    }
});

//defaults to localhost or can be placed explicity
server.listen(8000,'127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
});