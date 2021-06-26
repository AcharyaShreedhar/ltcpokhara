const express = require("express");
const router = express.Router();

const noticesController = require("../controller/noticesController");
router.post(
  "/noticesList",
  noticesController.getAllNotices
);
router.get(
  "/notices/:noticeId",
  noticesController.getNotices
);
router.post(
  "/notices",
  noticesController.addNotices
);
router.put(
  "/notices/:noticeId",
  noticesController.updateNotices
);
router.delete(
  "/notices/:noticeId",
  noticesController.deleteNotices
);
module.exports = router;