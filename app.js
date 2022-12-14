const express = require('express');
const app = express();
//const myRoute = require('./routes/route.js');
const bodyParser = require('body-parser');
const path = require('path');

const cookieParser = require('cookie-parser')
const session = require('express-session');

const csrf = require('csurf');;
const csrfProtection = csrf();

/*import the router*/
const homeRoute = require(path.join(__dirname, "routes", "homeRoute.js"));

//use EJS as view layer engine, use views folder to store html files
app.set('view engine', 'ejs');
app.set('views', 'views');

//make the public folder static
app.use(express.static(path.join(__dirname, 'public')));

//use BodyParser
// For easy access to body data
app.use(bodyParser.urlencoded({extended: false}));

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

// To access the cookie values
app.use(cookieParser());
//for work with session
app.use(session({
    secret: 'kñsjdnrkncllñkm', 
    resave: false, // The session will not be saved on every request, it will only be saved if something changed
    saveUninitialized: false, // Ensures that a session is not saved for a request that does not need it
}));

//protect from csrf
//must be after use(cookieParser()) and use(session)
app.use(csrfProtection);

//Get Option Inited
//optionModel.init(); //no need for reto
//console.log(optionModel.work_state);
app.get('/', (request, response, next) => {
    console.log("Redirect to home");
    response.redirect('/home');
});

//app.use('/', myRoute);
app.use('/home', homeRoute);

app.use( (request, response, next) => {
    //response.statusCode = 404;
    response.status(404);
    response.send('Page Not Found - Hu'); 
} );

//app.listen(3000);
app.listen(8080);