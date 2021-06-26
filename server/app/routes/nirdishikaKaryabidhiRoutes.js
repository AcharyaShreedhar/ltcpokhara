const express = require("express");
const router = express.Router();

const nirdeshikaKaryabidhiController = require("../controller/nirdeshikaKaryabidhiController");
router.post("/nirdeshikakaryabidhiList", nirdeshikaKaryabidhiController.getAllNirdeshikaKaryabidhi);
router.get("/nideshika_karyabidhi/:nirdeshikaId", nirdeshikaKaryabidhiController.getNirdeshikaKaryabidhi);
router.post("/nideshika_karyabidhi", nirdeshikaKaryabidhiController.addNirdeshikaKaryabidhi);
router.put("/nideshika_karyabidhi/:nirdeshikaId", nirdeshikaKaryabidhiController.updateNirdeshikaKarbidhi);
router.delete("/nideshika_karyabidhi/:nirdeshikaId", nirdeshikaKaryabidhiController.deleteNirdeshikaKaryabidhi);
module.exports = router;
