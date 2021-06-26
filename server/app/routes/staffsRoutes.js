const express = require("express");
const router = express.Router();

const staffsController = require("../controller/staffsController");
router.post("/staffList", staffsController.getAllstaffs);
router.get("/staffs/:staffId", staffsController.getStaffs);
router.post("/staffs", staffsController.addStaffs);
router.put("/staffs/:staffId", staffsController.updateStaffs);
router.delete("/staffs/:staffId", staffsController.deleteStaffs);
module.exports = router;
