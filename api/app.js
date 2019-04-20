const express = require("express");
const dotenv = require("dotenv");
const logger = require("morgan");
const path = require('path');


const app = express();
dotenv.config({path: ".env"});

app.use(logger("dev"));
app.set("port", process.env.PORT || 9000);
app.use(express.static(__dirname + "public"));


module.exports = app;