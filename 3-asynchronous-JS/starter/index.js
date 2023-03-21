// https://dog.ceo/api/breed/hound/images/random endpoint for dog api
// use npm init from dir to create the package.json file
//  npm i <package_name>

const fs = require('fs');
const superagent = require('superagent');

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`Breed: ${data}`);

//     superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random `)
//     .end((err,res) => {
//         if (err) return console.log(err.message); //return to exit the function
//         console.log(res.body.message);

//         fs.writeFile('dog-img.txt', res.body.message, err => {
//             if (err) return console.log(err.message);
//             console.log('Random dog image saved to file');
//         });
//     });
// });
//  Callback hell - lots of call backs above, can see how this can get messy after a while.

// Promises and Awaits to avoid hell
// superagent has support for this OTB
// then only handles resolved promises and not erros so we need catch
// Idea is to create a promise for the file, then if a promise is fulfilled it will run below where we call the function. Async JS.

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('File not found')
            resolve(data); //calling resolve function marks promise as success
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could not write file');
            resolve('success');
        })
    })
}

const getDogPic = async () => { //await needs to be inside of an async function
    try { //using try and catch to handle errors
    const data = await readFilePro(`${__dirname}/dog.txt`); // await stops code until promise is resolved. Making this data we recieve into a variable is extra readable
    console.log(`Breed: ${data}`);

    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random `);
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Image saved to file!');
}
catch (err) {
    console.log(err); //err comes from the promise that was rejected

    throw err //causes this promise to be rejected
}
 return '2:Ready'
};

// using async and await we are able to make the code wait for the promises before executing, thus making it far more readable than the commented out code below and above.
console.log('1: Will get dog pics');
getDogPic().then(x => { //since dogpic is a promise we can add a .then and include other things
    console.log(x);
    console.log('3: Done getting dog pics');
}).catch (err => {
    console.log('ERROR!'); // if error is thrown in async function this will output
})

/*
readFilePro(`${__dirname}/dog.txt`) // use then like below allows us to Chain the promises. One promise is successful (readFilePro) and then it can use to link another promise and another after that and so on.
.then(data => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random `) //get returns a promise
})
.then(res => {
         console.log(res.body.message);

        return writeFilePro('dog-img.txt', res.body.message)// herer is another returned promise
     })
.then(() => { //chained promise
        console.log('Random dog image saved to file');
     })
.catch(err => { //errors can be seperated here with the catch function
         console.log(err); //err comes from the promise that was rejected
     });// Key is to return a promise before calling .then and chaining together the promises
*/