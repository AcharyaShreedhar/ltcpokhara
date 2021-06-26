const bcrypt = require("bcrypt"); // bcrypt
const pool = require("../db");
const util = require("../db/utility");

//Controller for Listing all staff
async function getAllstaffs(req, res) {
  const getTotalQuery = "SELECT count(*) as total from staffs";
  const getAllStaffsQuery = `select * from staffs ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllStaffsQuery,
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

//Controller for Listing a staff
async function getStaffs(req, res) {
  const getStaffsQuery = `select * from staffs where staff_id=?`;
  pool.query(getStaffsQuery, [req.params.staffId], (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, data: results }));
  });
}

//Controller for adding a staff
async function addStaffs(req, res) {
  const addStaffsQuery = `INSERT INTO staffs (staff_name, staff_designation, staff_branch, staff_email, staff_file) values (?, ?, ?, ?, ?)`;
  pool.query(
    addStaffsQuery,
    [
      req.body.staff_name,
      req.body.staff_designation, 
      req.body.staff_branch, 
      req.body.staff_email, 
      req.body.staff_file, 
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}
//Controller for updating a staff
async function updateStaffs(req, res) {
  const updateStaffsQuery = `UPDATE staffs SET staff_name=?, staff_designation=?, staff_branch=?, staff_email=?, staff_file=? WHERE staff_id=?`;
  pool.query(
    updateStaffsQuery,
    [
      req.body.staff_name,
      req.body.staff_designation, 
      req.body.staff_branch, 
      req.body.staff_email, 
      req.body.staff_file,
      req.params.staffId,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for deleting a staffs
async function deleteStaffs(req, res) {
  const deleteStaffsQuery = `DELETE  FROM staffs where staff_id=?`;
  pool.query(
    deleteStaffsQuery,
    [req.params.staffsId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

module.exports = {
  getAllstaffs,
  getStaffs,
  addStaffs,
  updateStaffs,
  deleteStaffs,

};
