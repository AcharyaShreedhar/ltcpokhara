const pool = require("../db")

//Controller for Listing all notices
async function getAllNotices(req, res) {
  const getTotalQuery = "SELECT count(*) as total from notices";
    const getAllNoticesQuery = `select * from notices ORDER BY ? ASC LIMIT ?, ?`;
    pool.query(getTotalQuery, [], (error, countresults, fields) => {
      if (error) throw error;
      pool.query(
        getAllNoticesQuery,
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
  
  //Controller for Listing a Notice
  async function getNotices(req, res) {
    const getNoticesQuery = `select * from notices where notice_id=?`;
    pool.query(getNoticesQuery, [req.params.noticeId], (error, results, fields) => {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    });
  }
  
  //Controller for adding a Notice
  async function addNotices(req, res) {
    const addNoticesQuery = `INSERT INTO notices (notice_title, notice_cat, notice_approvedby, notice_publisheddate) values (?,?,?,?)`;
    pool.query(
      addNoticesQuery,
      [
               
        req.body.notice_title,
        req.body.notice_cat,
        req.body.notice_approvedby,
        req.body.notice_publisheddate,         
      ],
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    );
  }
  
  //Controller for updating a notice
  async function updateNotices(req, res) {
    const updateNoticesQuery = `UPDATE notices SET notice_title=?, notice_cat=?, notice_approvedby=?, notice_publisheddate=? WHERE notice_id=?`;
    pool.query(
      updateNoticesQuery,
      [
                       
        req.body.notice_title,
        req.body.notice_cat,
        req.body.notice_approvedby,
        req.body.notice_publisheddate,
        req.params.noticeId,
      ],
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    );
  }
  
  //Controller for deleting a Notice
  async function deleteNotices(req, res) {
    const deleteNoticesQuery = `DELETE  FROM notices where notice_id=?`;
    pool.query(
      deleteNoticesQuery,
      [req.params.noticeId],
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    );
  }
  
  module.exports = {
    getAllNotices,
    getNotices,
    addNotices,
    updateNotices,
    deleteNotices,
  };
  
  