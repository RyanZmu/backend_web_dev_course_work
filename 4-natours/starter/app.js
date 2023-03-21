const express = require('express');
const morgan = require('morgan');//popular logging middleware

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

//1) Middlewares - app.js typically is where we have our middleware for all routes
app.use(morgan('dev'));

//express.json() = middleware because it can manipulate data between a req and res
// ensures the body of data is added to req object
// for example comment this out and see how during a POST we get nothing to the console
app.use(express.json()); //use() for middleware

// order matters since getALlTours returns a status 200 it ends the request.
//custom middleware function, next is third - without specificing route it will be present in all requests - comes after the first routes so it will not run during those requests
app.use((req,res,next) => {
    console.log('Hello from the middleware');
    next();
});

//function to check date can be added anywhere now in any request
app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// 2) Routes - also middleware themselves!
app.use('/api/v1/tours', tourRouter); //use middleware to create a router
app.use('/api/v1/users', userRouter); //this is called Mounting a router


module.exports = app;

//RESTFUL API
/*Principles:

1. Seperate API into logical resources - All data should be divided. An object or representation of data. Such as endpoints being named tours,users,reviews, api.com/tours. Should not contain what the method is doing. api.com/getTour ---> api.com/tours and when a user uses ths endpoint we use a GET method. The user doesnt need to see api.com/getTour. Can add tours/7 or tours/africa for the user to see. api.com/addNewTour ----> api.com/tours and then use POST method. The difference is the HTTP method used and the url stays the SAME.

POST - Create
GET - Read
PUT/PATCH - Update
DELETE - Delete
CRUD operations

url stays the same for the user to see, on our end the code will run the appropiate method.

api.com/getToursByUser --to--> GET api.com/users/3/tours

2. Expose structed resource based URLS
3. Use HTTP Methods
4. Send data as JSON
JSON all keys need to be strings unless normal JS objects

JSend
response formatting, wrapping JSON into another object with "status": "success" as the response before showing the data

5. Be stateless
All state is handled on client and not on the server.

State - piece of data in the app that might change over time like if a certain user is logged in and what page is current

Each request must contain all details needed to process the request on the server. The server does not need to rememeber the last request to process the current request.
Example of state: loggedIn currentPage

currentPage = 5
Could do api/tours/nextPage - the server needs to know what the previous page is so it is handled state server side. DO NOT WANT!

instead:

api.com/tours/page/6 - the server won't need to know what the previous page was, just that it needs page 6

*/

// Middleware
/*
all of Node is essentially middleware
routers are middleware
Middleware stack - defined by order that they are defined in the code.

Order of code matters in Express

Req and Res objects go through each part of middleware using next() to define what the next function should until we reach res.send() - which finishes the request/response cycle

A pipeline of middleware functions
*/