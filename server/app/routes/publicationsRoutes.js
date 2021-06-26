const express = require("express");
const router = express.Router();

const publicationsController = require("../controller/publicationsController");
router.post("/publicationsList", publicationsController.getAllPublications);
router.get("/publications/:publicationId", publicationsController.getPublications);
router.post("/publications", publicationsController.addPublications);
router.put("/publications/:publicationId", publicationsController.updatePublications);
router.delete("/publications/:publicationId", publicationsController.deletePublications);
module.exports = router;