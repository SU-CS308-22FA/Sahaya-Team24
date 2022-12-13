const db = require("../models");
const Date = db.dates;
const Op = db.Sequelize.Op;

// Create and Save a new Date
exports.create = (req, res) => {
  // Validate request
  console.log("req body");
  console.log(req.body);
  console.log("req params");
  console.log(req.params);
  console.log("req data");
  console.log(req.data);
  if (!req.body.r_id || !req.body.date) {
    console.log("help");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Player
  const date = {
    r_id: req.body.r_id,
    date: req.body.date,
  };

  // Save Referee in the database
  Referee.create(date)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Date."
      });
    });
};