const mongoose = require("mongoose");
const { Schema } = mongoose;

const PicOfTheDay = Schema({
  date: {
    type: String
  },
  explanation: String,
  hdurl: String,
  media_type: String,
  service_version: String,
  title: String,
  url: String
});

module.exports = mongoose.model("PicOfTheDay", PicOfTheDay);
