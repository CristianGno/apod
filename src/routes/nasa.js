const express = require("express");
const router = express.Router();
const NasaController = require("../controllers/nasa");

router.get("/", NasaController.get);
router.get("/deleteAll", NasaController.deleteAll);
router.get("/getAll", NasaController.getAll);
router.get('/download/:id', NasaController.download)

module.exports = router;
