const uriApi =
  "https://api.nasa.gov/planetary/apod?api_key=ORc6SUhXJ6DnjoFlzfScCOpn5pGTeJ49PRFNUAgk";

const PicOfTheDay = require("../models/PicOfTheDay");
const moment = require("moment");
const axios = require("axios");
const fs = require('fs');
const path = require("path");
const request = require("request");
const config = require('../config')

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

    var fecha1 = `${fecha} 00:00:00`;
    console.log(fecha1)

    const fechaSiguiente = moment(fecha1)
      .add(1, "day")
      .format("YYYY-MM-DD");
    const fechaAnterior = moment(fecha1)
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
        //console.log("axios");
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
  },

  async download(req, res){
    const { id } = req.params;
    var pic = await PicOfTheDay.findOne({_id: id});
    var { url } = pic;
    var u = '';
    var l = url.split('/');
    var pt = 'public/downloads/';

    var filename = pt + l[l.length - 1]
    var x = `${config.BASE_PATH}/${filename}`

    request.head(url, function (err, resp, body){
        request(url).pipe(fs.createWriteStream(x)).on('close', function(){
          res.download(x, l[l.length - 1], function(){
            fs.unlink(x, function(e){})
          })
        });
    })
  }
};

module.exports = Controller;
