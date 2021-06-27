const pool = require("../db");

//Controller for Listing all press releases
async function getAllPressRelease(req, res) {
  const getTotalQuery = "SELECT count(*) as total from press_releases";
  const getAllPressReleaseQuery = `select * from press_releases ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllPressReleaseQuery,
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

//Controller for Listing a Press release
async function getPressRelease(req, res) {
  const getPressReleaseQuery = `select * from press_releases where pressrelease_id=?`;
  pool.query(
    getPressReleaseQuery,
    [req.params.pressReleaseId],
    (error, results, fields) => {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for adding a press release
async function addPressRelease(req, res) {
  const addPressReleaseQuery = `INSERT INTO press_releases (pressrelease_title, submitted_by, published_date, pressrelease_content,pressrelease_file) values (?,?,?,?,?)`;
  pool.query(
    addPressReleaseQuery,
    [
      req.body.pressrelease_title,
      req.body.submitted_by,
      req.body.published_date,
      req.body.pressrelease_content,
      req.body.pressrelease_file,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for updating a press release
async function updatePressRelease(req, res) {
  const updatePressReleaseQuery = `UPDATE press_releases SET pressrelease_title=?, submitted_by=?, published_date=?, pressrelease_content=?,pressrelease_file=? WHERE pressrelease_id=?`;
  pool.query(
    updatePressReleaseQuery,
    [
      req.body.pressrelease_title,
      req.body.submitted_by,
      req.body.published_date,
      req.body.pressrelease_content,
      req.body.pressrelease_file,
      req.params.pressReleaseId,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for deleting a press release
async function deletePressRelease(req, res) {
  const deletePressReleaseQuery = `DELETE  FROM press_releases where pressrelease_id=?`;
  pool.query(
    deletePressReleaseQuery,
    [req.params.pressReleaseId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

module.exports = {
  getAllPressRelease,
  getPressRelease,
  addPressRelease,
  updatePressRelease,
  deletePressRelease,
};
