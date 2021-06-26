const express = require("express");
const router = express.Router();

const nirdeshikaKaryabidhiController = require("../controller/nirdeshikaKaryabidhiController");
router.post("/nirdeshikakaryabidhiList", nirdeshikaKaryabidhiController.getAllNirdeshikaKaryabidhi);
router.get("/nideshikakaryabidhi/:nirdeshikaId", nirdeshikaKaryabidhiController.getNirdeshikaKaryabidhi);
router.post("/nideshikakaryabidhi", nirdeshikaKaryabidhiController.addNirdeshikaKaryabidhi);
router.put("/nideshikakaryabidhi/:nirdeshikaId", nirdeshikaKaryabidhiController.updateNirdeshikaKarbidhi);
router.delete("/nideshikakaryabidhi/:nirdeshikaId", nirdeshikaKaryabidhiController.deleteNirdeshikaKaryabidhi);
module.exports = router;
