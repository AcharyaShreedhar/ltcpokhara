const express = require("express");
const router = express.Router();

const pressReleaseController = require("../controller/pressReleaseController");
router.post(
  "/pressReleaseList",
  pressReleaseController.getAllPressRelease
);
router.get(
  "/pressRelease/:pressReleaseId",
  pressReleaseController.getPressRelease
);
router.post(
  "/pressRelease",
  pressReleaseController.addPressRelease
);
router.put(
  "/pressRelease/:pressReleaseId",
  pressReleaseController.updatePressRelease
);
router.delete(
  "/pressRelease/:pressReleaseId",
  pressReleaseController.deletePressRelease
);
module.exports = router;