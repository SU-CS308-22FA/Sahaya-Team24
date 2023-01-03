const db = require("../models");
const Matchfield = db.matchfields;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.r_id || !req.body.date) {
    console.log("help");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const matchfield = {
    f_id: req.body.r_id,
    f_name: req.body.f_name,
    f_location: req.body.f_location,
  };

  // Create and save matchfield in the database
  Matchfield.create(matchfield)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the matchfield."
      });
    });
};

exports.findAll = (req, res) => {
  var condition = req ? req : null;

  Matchfield.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving matchfields."
      });
    });
};