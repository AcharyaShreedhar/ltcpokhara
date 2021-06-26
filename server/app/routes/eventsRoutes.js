const express = require("express");
const router = express.Router();

const eventsController = require("../controller/eventsController");
router.post(
  "/eventsList",
  eventsController.getAllEvents
);
router.get(
  "/events/:eventId",
  eventsController.getEvents
);
router.post(
  "/events",
  eventsController.addEvents
);
router.put(
  "/events/:eventId",
  eventsController.updateEvents
);
router.delete(
  "/events/:eventId",
  eventsController.deleteEvents
);
module.exports = router;