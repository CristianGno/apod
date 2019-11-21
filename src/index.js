"use strict";

require('dotenv').config()

const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require('./config')
const db = require('./database')
const secure = require('express-force-https');
const node_env = process.env.NODE_ENV || 'development';

config.BASE_PATH = __dirname;

//settings
app.set("port", process.env.PORT || config.PORT);

//Midlewares
app.use(morgan("dev"));
app.use(express.json());

if (node_env == 'production') {
	console.log(node_env)
	app.use(secure)
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-SOCKET-ID, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//routes

app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/nasa", require("./routes/nasa"));

//static

app.use(express.static(`${__dirname}/public`));

//Server Listen
app.listen(app.get("port"), () => {
  //console.log(`Server Listening in port ${app.get("port")}`);
  console.log("Open http://localhost:" + app.get("port"));
});
