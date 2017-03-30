"use strict";
let express = require('express'),
    app = express(),
    session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded()); 
let cookieParser = require('cookie-parser');
let path = require('path');
let util = require("util");

app.use(cookieParser());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
 
app.use(function(req, res, next) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  console.log("session :  "+util.inspect(req.session));
  next();
});

// Authentication and Authorization Middleware
let auth = function(req, res, next) {
  if (req.session && req.session.user == "admin")
    return next();
  else
    return res.sendStatus(401); // https://httpstatuses.com/401
};

app.post('/login', function(req, res, next){
	console.log(req.body)
    if (req.body.user == "admin" && req.body.password == "1234"){
   	console.log(req.body.user.name);
   	console.log(req.body.user.email);
	req.session.user = "admin";
	req.session.password = "1234";
	req.session.admin = "true";
	res.send("Login succesful! You should now visit /content for the book. You should visit /parse for the parser.");
    }
    else{
	res.send("Login failed!");
    }
});

app.use('/', express.static(path.join(__dirname,'')));

app.get('/content/*', function(req, res, next){
        auth(req, res, next);
});

app.get('/parse/*', function(req, res, next){
	auth(req, res, next);
});

app.use('/content', express.static(path.join(__dirname, 'public')));

app.use('/parse', express.static(path.join(__dirname, 'parse')));

app.listen(8081);
console.log("app running at http://localhost:8081");
