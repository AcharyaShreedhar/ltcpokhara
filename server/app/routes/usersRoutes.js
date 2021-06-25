const express = require("express");
const router = express.Router();

const usersController = require("../controller/usersController");
router.post("/usersList", usersController.getAllUsers);
router.get("/users/:userId", usersController.getUsers);
router.post("/users", usersController.addUsers);
router.put("/users/:userId", usersController.updateUsers);
router.delete("/users/:userId", usersController.deleteUsers);
router.post("/users/login", usersController.verifyUsers);
module.exports = router;
