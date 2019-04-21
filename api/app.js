const path = require('path');
const logger = require("morgan"); // to log user requested url on server
const dotenv = require("dotenv"); // to config envirnment
const express = require("express");
const mongoose = require('mongoose');
const mongo = require("connect-mongo")
const bodyParser = require("body-parser");

// for security these this are
const expressValidator = require("express-validator");
const  session = require('express-session');
const compression = require("compression");
const helmet = require("helmet");
const lusca = require("lusca");

const cors = require("cors"); // for cross-origin resource shearing at http.
const bluebird = require("bluebird"); // used for creatin promise

// var Pusher = require('pusher'); will not use it here it is used to real time pushing and need account

const app = express();
dotenv.config({path: ".env"});
app.set("port", process.env.PORT);


// MONGO SETUP
const MongoStore = mongo(session);

const mongoUrl = process.env.TEST ? process.env.MONGO_TEST : process.env.MONGO_URI;

(mongoose).Promise = bluebird;
mongoose.connect(mongoUrl, {useNewUrlParser: true})
        .then(() => console.log("Connected to Mongo DB"))
        .catch(err =>console.log("MongoDB connection error. Please make sure MongoDB is running. " + err));

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        url: mongoUrl,
        autoReconnect: true
    })
}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});
app.use(logger("dev"));


import {
    user
} from "./src/routes";


// for testing if the server is running
app.get('/', function(req, res){ 
    res.send('<html>all is well...</html>');
});



module.exports = app;