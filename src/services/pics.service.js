const uriApi =
  "https://api.nasa.gov/planetary/apod?api_key=ORc6SUhXJ6DnjoFlzfScCOpn5pGTeJ49PRFNUAgk";

const PicOfTheDay = require("../models/PicOfTheDay");
const moment = require("moment");
const axios = require("axios");

async function getPics(fecha) {
  return [];
}

module.exports = {
  getPics
};
