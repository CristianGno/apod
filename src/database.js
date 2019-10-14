const mongoose = require("mongoose");
const config = require('./config')

const db = mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(db => {
    console.log("DB connected");
  })
  .catch(err => console.log(err));

module.exports = db;