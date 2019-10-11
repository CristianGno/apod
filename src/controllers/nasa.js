const uriApi =
  "https://api.nasa.gov/planetary/apod?api_key=ORc6SUhXJ6DnjoFlzfScCOpn5pGTeJ49PRFNUAgk";

const PicOfTheDay = require("../models/PicOfTheDay");
const moment = require("moment");
const axios = require("axios");

const { getPics } = require("../services/pics.service");

const Controller = {
  async getAll(req, res) {
    const pics = await PicOfTheDay.find();
    return res.json(pics);
  },

  get(req, res) {
    var fecha = moment().format("YYYY-MM-DD");
    if (req.query.date) {
      fecha = req.query.date;
    }

    const fechaSiguiente = moment(fecha)
      .add(1, "day")
      .format("YYYY-MM-DD");
    const fechaAnterior = moment(fecha)
      .subtract(1, "day")
      .format("YYYY-MM-DD");

    var temp = PicOfTheDay.find({ date: fecha });

    temp.then(response => {
      if (response.length > 0) {
        return res.json({
          pic: response,
          fechaSiguiente,
          fechaAnterior
        });
      } else {
        console.log("axios");
        var target = uriApi + "&date=" + fecha;
        return axios.get(target).then(response => {
          var tempPic = new PicOfTheDay(response.data).save((err, stored) => {
            res.json({
              pic: stored,
              fechaSiguiente,
              fechaAnterior
            });
          });
        });
      }
    });

    //res.send("Hola");
  },

  async deleteAll(req, res) {
    await PicOfTheDay.deleteMany({});
    res.json("Deleted All");
  }
};

module.exports = Controller;
