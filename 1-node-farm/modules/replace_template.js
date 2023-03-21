module.exports = (temp,product) => { //product = object
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