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

  // Create a date
  const date = {
    r_id: req.body.r_id,
    date: req.body.date,
  };

  // Save Date in the database
  Date.create(date)
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

// Delete date functionality
exports.delete = (req, res) => {
  const date = req.params.date;
  console.log(date);
  Date.destroy({
    where: { date: date}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Date deleted successfully"
      });
    } else {
      res.send({
        message: `Cannot delete Date with date=${date}. Maybe Date was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Date with date" + date
    });
  });
}

exports.findAll = (req, res) => {
  var condition = req ? req : null;
  Date.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occured while retrieving dates"
      });
    });
}