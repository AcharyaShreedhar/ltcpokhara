const pool = require("../db")

//Controller for Listing all events
async function getAllEvents(req, res) {
  const getTotalQuery = "SELECT count(*) as total from events";
    const getAllEventsQuery = `select * from events ORDER BY ? ASC LIMIT ?, ?`;
    pool.query(getTotalQuery, [], (error, countresults, fields) => {
      if (error) throw error;
      pool.query(
        getAllEventsQuery,
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
  
  //Controller for Listing a Event
  async function getEvents(req, res) {
    const getEventsQuery = `select * from events where event_id=?`;
    pool.query(getEventsQuery, [req.params.eventId], (error, results, fields) => {
      if (error) throw error;
      res.send(JSON.stringify({ status: 200, error: null, data: results }));
    });
  }
  
  //Controller for adding a Event
  async function addEvents(req, res) {
    const addEventsQuery = `INSERT INTO events (event_title, submitted_by, published_date, event_content) values (?,?,?,?)`;
    pool.query(
      addEventsQuery,
      [
               
        req.body.event_title,
        req.body.submitted_by,
        req.body.published_date,
        req.body.event_content,         
      ],
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    );
  }
  
  //Controller for updating a Event
  async function updateEvents(req, res) {
    const updateEventsQuery = `UPDATE events SET event_title=?, submitted_by=?, published_date=?, event_content=? WHERE event_id=?`;
    pool.query(
      updateEventsQuery,
      [
                       
        req.body.event_title,
        req.body.submitted_by,
        req.body.published_date,
        req.body.event_content,
        req.params.eventId,
      ],
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    );
  }
  
  //Controller for deleting a Event
  async function deleteEvents(req, res) {
    const deleteEventsQuery = `DELETE  FROM events where event_id=?`;
    pool.query(
      deleteEventsQuery,
      [req.params.eventId],
      (error, results, fields) => {
        if (error) {
          throw error;
        }
        res.send(JSON.stringify({ status: 200, error: null, data: results }));
      }
    );
  }
  
  module.exports = {
    getAllEvents,
    getEvents,
    addEvents,
    updateEvents,
    deleteEvents,
  };
   
  