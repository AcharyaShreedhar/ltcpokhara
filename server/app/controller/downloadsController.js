const pool = require("../db");

//Controller for Listing all Downloads
async function getAllDownloads(req, res) {
  const getTotalQuery = "SELECT count(*) as total from downloads";
  const getAllDownloadsQuery = `select * from downloads ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllDownloadsQuery,
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

//Controller for Listing a Download
async function getDownloads(req, res) {
  const getDownloadsQuery = `select * from downloads where download_id=?`;
  pool.query(getDownloadsQuery, [req.params.downloadId], (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, data: results }));
  });
}

//Controller for adding a Download
async function addDownloads(req, res) {
  const addDownloadsQuery = `INSERT INTO downloads ( download_title, published_date, download_file) values (?,?,?)`;
  pool.query(
    addDownloadsQuery,
    [

        req.body.download_title,
        req.body.published_date,
        req.body.download_file,
        
       
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for updating a Download
async function updateDownloads(req, res) {
  const updateDownloadsQuery = `UPDATE downloads SET download_title=?,  published_date=?, download_file=? WHERE download_id=?`;
  pool.query(
    updateDownloadsQuery,
    [
        req.body.download_title,
        req.body.published_date,
        req.body.download_file,
        req.params.downloadId,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for deleting a Download
async function deleteDownloads(req, res) {
  const deleteDownloadsQuery = `DELETE  FROM downloads where download_id=?`;
  pool.query(
    deleteDownloadsQuery,
    [req.params.downloadId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

module.exports = {
  getAllDownloads,
  getDownloads,
  addDownloads,
  updateDownloads,
  deleteDownloads,
};