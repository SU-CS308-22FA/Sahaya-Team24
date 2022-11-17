const db = require("../models");
const Match = db.matches;
const Op = db.Sequelize.Op;

// Create and Save a new match
exports.create = (req, res) => {
    // Validate request
    console.log("req body");
    console.log(req.body);
    console.log("req params");
    console.log(req.params);
    console.log("req data");
    console.log(req.data);
    if (!req.body.m_id || !req.body.m_name || !req.body.m_location|| !req.body.m_maxPlayer || !req.body.m_curPlayer || !req.body.m_needRefree || !req.body.m_date) {
      console.log("help");
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Match
    const match = {
        m_id: req.body.m_id,
        m_name: req.body.m_name,
        m_location: req.body.m_location,
        m_maxPlayer: req.body.m_maxPlayer,
        m_curPlayer: 0,
        m_needRefree: req.body.m_needRefree,
        m_date: req.body.m_date
    };
  
    // Save Match in the database
    Match.create(match)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the match."
        });
      });
  };


