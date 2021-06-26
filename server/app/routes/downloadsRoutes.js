const express = require("express");
const router = express.Router();

const downloadsController = require("../controller/downloadsController");
router.post("/downloadsList", downloadsController.getAllDownloads);
router.get("/downloads/:downloadId", downloadsController.getDownloads);
router.post("/downloads", downloadsController.addDownloads);
router.put("/downloads/:downloadId", downloadsController.updateDownloads);
router.delete("/downloads/:downloadId", downloadsController.deleteDownloads);
module.exports = router;