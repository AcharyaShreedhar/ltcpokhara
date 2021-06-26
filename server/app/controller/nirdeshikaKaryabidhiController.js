const bcrypt = require("bcrypt"); // bcrypt
const pool = require("../db");
const util = require("../db/utility");

//Controller for Listing all nirdeshika_karyabidhi
async function getAllNirdeshikaKaryabidhi(req, res) {
  const getTotalQuery = "SELECT count(*) as total from nideshika_karyabidhi";
  const getAllNirdeshikaKaryabidhiQuery = `select * from nideshika_karyabidhi ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllNirdeshikaKaryabidhiQuery,
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

//Controller for Listing a nirdeshika karyabidhi
async function getNirdeshikaKaryabidhi(req, res) {
  const getNirdeshikaKaryabidhiQuery = `select * from nideshika_karyabidhi where nirdeshika_id=?`;
  pool.query(getNirdeshikaKaryabidhiQuery, [req.params.nirdishikaId], (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, data: results }));
  });
}

//Controller for adding a nirdeshika karyabidhi
async function addNirdeshikaKaryabidhi(req, res) {
  const addNirdeshikaKaryabidhiQuery = `INSERT INTO nideshika_karyabidhi (nirdeshika_sirsak, nirdeshika_bisaya, nirdeshika_miti, nirdeshika_file) values ( ?, ?, ?, ?)`;
  pool.query(
    addNirdeshikaKaryabidhiQuery,
    [
      req.body.nirdeshika_sirsak,
      req.body.nirdeshika_bisaya, 
      req.body.nirdeshika_miti, 
      req.body.nirdeshika_file,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}
//Controller for updating a nirdeshika_karyabidhi
async function updateNirdeshikaKarbidhi(req, res) {
  const updateNirdeshikaKaryabidhiQuery = `UPDATE nideshika_karyabidhi SET nirdeshika_sirsak=?, nirdeshika_bisaya=?, nirdeshika_miti=?, nirdeshika_file=? WHERE nirdeshika_id=?`;
  pool.query(
    updateNirdeshikaKaryabidhiQuery,
    [
      req.body.nirdeshika_sirsak,
      req.body.nirdeshika_bisaya, 
      req.body.nirdeshika_miti, 
      req.body.nirdeshika_file,
      req.params.nirdishikaId,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for deleting a nirdeshika_karyabidhi
async function deleteNirdeshikaKaryabidhi(req, res) {
  const deleteNirdeshikaKaryabidhiQuery = `DELETE  FROM  nideshika_karyabidhi where nirdeshika_id=?`;
  pool.query(
    deleteNirdeshikaKaryabidhiQuery,
    [req.params.nirdeshikaId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

module.exports = {
    getAllNirdeshikaKaryabidhi,
    getNirdeshikaKaryabidhi,
    addNirdeshikaKaryabidhi,
    updateNirdeshikaKarbidhi,
    deleteNirdeshikaKaryabidhi


};
