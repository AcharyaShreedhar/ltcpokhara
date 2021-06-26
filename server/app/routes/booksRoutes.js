const express = require("express");
const router = express.Router();

const booksController = require("../controller/booksController");
router.post("/booksList", booksController.getAllBooks);
router.get("/books/:bookId", booksController.getBooks);
router.post("/books", booksController.addBooks);
router.put("/books/:bookId", booksController.updateBooks);
router.delete("/books/:bookId", booksController.deleteBooks);
module.exports = router;