const pool = require("../db");

//Controller for Listing all Publications
async function getAllPublications(req, res) {
  const getTotalQuery = "SELECT count(*) as total from publications";
  const getAllPublicationsQuery = `select * from publications ORDER BY ? ASC LIMIT ?, ?`;
  pool.query(getTotalQuery, [], (error, countresults, fields) => {
    if (error) throw error;
    pool.query(
      getAllPublicationsQuery,
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

//Controller for Listing a Publication
async function getPublications(req, res) {
  const getPublicationsQuery = `select * from assets where publication_id=?`;
  pool.query(getPublicationsQuery, [req.params.publicationId], (error, results, fields) => {
    if (error) throw error;
    res.send(JSON.stringify({ status: 200, error: null, data: results }));
  });
}

//Controller for adding a Publication
async function addPublications(req, res) {
  const addPublicationsQuery = `INSERT INTO publications (publication_title, publication_subject, publication_cat, publication_date, publication_file) values (?,?,?,?,?)`;
  pool.query(
    addPublicationsQuery,
    [

        req.body.publications_title,
        req.body.publication_subject,
        req.body.publication_cat,
        req.body.publication_date,
        req.body.publication_file,
       
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for updating a Publication
async function updatePublications(req, res) {
  const updatePublicationsQuery = `UPDATE publications SET publications_title=?, publication_subject=?, publication_cat=?, publication_date=?, publication_file=? WHERE publication_id=?`;
  pool.query(
    updateAssetsQuery,
    [
      req.body.publications_title,
      req.body.publication_subject,
      req.body.publication_cat,
      req.body.publication_date,
      req.body.publication_file,
      req.params.publicationId,
    ],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

//Controller for deleting a Publication
async function deletePublications(req, res) {
  const deletePublicationsQuery = `DELETE  FROM assets where publiation_id=?`;
  pool.query(
    deletePublicationsQuery,
    [req.params.publicationId],
    (error, results, fields) => {
      if (error) {
        throw error;
      }
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    }
  );
}

module.exports = {
  getAllPublications,
  getPublications,
  addPublications,
  updatePublications,
  deletePublications,
};