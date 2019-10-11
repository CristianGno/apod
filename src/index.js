"use strict";

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require('./config')

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(db => {
    console.log("DB connected");
  })
  .catch(err => console.log(err));

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
