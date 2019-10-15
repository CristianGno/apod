"use strict";

require('dotenv').config()

const express = require("express");
const app = express();
const morgan = require("morgan");
const config = require('./config')
const db = require('./database')
config.BASE_PATH = __dirname;

//settings
app.set("port", process.env.PORT || config.PORT);

//Midlewares
app.use(morgan("dev"));
app.use(express.json());

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
