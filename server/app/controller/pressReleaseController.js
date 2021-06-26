const pool = require("../db")

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
    const getPressReleaseQuery = `select * from press_releases where press_release_id=?`;
    pool.query(getPressReleaseQuery, [req.params.pressReleaseId], (error, results, fields) => {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    });
  }
  
  //Controller for adding a press release
  async function addPressRelease(req, res) {
    const addPressReleaseQuery = `INSERT INTO press_releases (press_release_title, press_submittedby, press_publisheddate, press_release_content) values (?,?,?,?)`;
    pool.query(
      addPressReleaseQuery,
      [
               
        req.body.press_release_title,
        req.body.press_submittedby,
        req.body.press_publisheddate,
        req.body.press_release_content,         
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
    const updatePressReleaseQuery = `UPDATE press_releases SET press_release_title=?, press_submittedby=?, press_publisheddate=?, press_release_content=? WHERE press_release_id=?`;
    pool.query(
      updatePressReleaseQuery,
      [
                       
        req.body.press_release_title,
        req.body.press_submittedby,
        req.body.press_publisheddate,
        req.body.press_release_content,
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
    const deletePressReleaseQuery = `DELETE  FROM press_releases where press_release_id=?`;
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
   
  