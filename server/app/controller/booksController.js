const pool = require("../db");

//Controller for Listing all Books
async function getAllBooks(req, res) {
  const getTotalQuery = "SELECT count(*) as total from books";
  const getAllBooksQuery = `select * from books ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllBooksQuery,
      [req.body.name, req.body.page, req.body.perPage],
      (error, results, fields) => {
        if (error) throw error;
        res.send(
          JSON.stringify({
            status: 200,
            error: null,
            data: {
              total: countresults[0].total,
              list: results,
            },
          })
        );
      }
    );
  });
}

//Controller for Listing a Book
async function getBooks(req, res) {
  const getBooksQuery = `select * from books where book_id=?`;
  pool.query(getBooksQuery, [req.params.bookId], (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, data: results }));
  });
}

//Controller for adding a Book
async function addBooks(req, res) {
  const addBooksQuery = `INSERT INTO books ( book_title, book_cat, published_date, book_file) values (?,?,?,?)`;
  pool.query(
    addBooksQuery,
    [

        req.body.book_title,
        req.body.book_cat,
        req.body.published_date,
        req.body.book_file,
       
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for updating a Book
async function updateBooks(req, res) {
  const updateBooksQuery = `UPDATE books SET book_title=?, book_cat=?,  published_date=?, book_file=? WHERE book_id=?`;
  pool.query(
    updateBooksQuery,
    [
        req.body.book_title,
        req.body.book_cat,
        req.body.published_date,
        req.body.book_file,
        req.params.bookId,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for deleting a Book
async function deleteBooks(req, res) {
  const deleteBooksQuery = `DELETE  FROM books where book_id=?`;
  pool.query(
    deleteBooksQuery,
    [req.params.bookId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

module.exports = {
  getAllBooks,
  getBooks,
  addBooks,
  updateBooks,
  deleteBooks,
};