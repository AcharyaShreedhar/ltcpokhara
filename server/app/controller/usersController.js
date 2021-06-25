const bcrypt = require("bcrypt"); // bcrypt
const pool = require("../db");
const util = require("../db/utility");

//Controller for Listing all Users
async function getAllUsers(req, res) {
  const getTotalQuery = "SELECT count(*) as total from users";
  const getAllUsersQuery = `select * from users ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllUsersQuery,
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

//Controller for Listing a User
async function getUsers(req, res) {
  const getUsersQuery = `select * from users where user_id=?`;
  pool.query(getUsersQuery, [req.params.userId], (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, data: results }));
  });
}

//Controller for adding a User
async function addUsers(req, res) {
  const saltRounds = 10;
  const token = util.generateAccessToken({ username: req.body.user_name });
  const addUsersQuery = `INSERT INTO users (user_type,user_name,user_pass,user_token,created_by,updated_by) values (?,?,?,?,?,?)`;
  bcrypt.hash(req.body.user_pass, saltRounds, function (error, hash) {
    let values = [
      req.body.user_type,
      req.body.user_name,
      hash,
      token,
      req.body.created_by,
      req.body.updated_by,
    ]; // query values
    // store hash in database
    pool.query(addUsersQuery, values, function (error, results) {
      if (error) throw error;
      else {
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    });
  });
}

//Controller for updating a User
async function updateUsers(req, res) {
  const saltRounds = 10;
  const token = util.generateAccessToken({ username: req.body.user_name });
  const updateUsersQuery = `UPDATE users SET user_type=?, user_name=?, user_pass=?,user_token=?,created_by=?,updated_by=? WHERE user_id=?`;
  bcrypt.hash(req.body.user_pass, saltRounds, function (error, hash) {
    let values = [
      req.body.user_type,
      req.body.user_name,
      hash,
      token,
      req.body.created_by,
      req.body.updated_by,
      req.params.userId,
    ];
    pool.query(updateUsersQuery, values, function (error, results) {
      if (error) {
        throw error;
      } else {
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    });
  });
}

//Controller for deleting a User
async function deleteUsers(req, res) {
  const deleteUsersQuery = `DELETE  FROM users WHERE user_id=?`;
  pool.query(
    deleteUsersQuery,
    [req.params.userId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

async function verifyUsers(req, res) {
  const getUsersPasswordQuery = `select user_id,user_name, user_pass,user_token from users where user_name=?`;
  pool.query(
    getUsersPasswordQuery,
    [req.body.user_name],
    (error, results, fields) => {
      if (error) throw error;
      else {
        var hash = results[0].user_pass;
        const user = {
          user_id: results[0].user_id,
          user_name: results[0].user_name,
          user_token: results[0].user_token,
        };

        //compare hash and password
        bcrypt.compare(req.body.user_pass, hash, function (error, result) {
          // execute code to test for access and login
          if (result) {
            res.send(
              JSON.stringify({
                status: 200,
                error: null,
                user: user,
                message: "You are successfully logged In",
              })
            );
          } else {
            res.send(
              JSON.stringify({
                status: 200,
                error: null,
                data: user,
                message:
                  "Your username or password doesnot match please try again later",
              })
            );
          }
        });
      }
    }
  );
}

module.exports = {
  getAllUsers,
  getUsers,
  addUsers,
  updateUsers,
  deleteUsers,
  verifyUsers,
};
