const db = require("../models");
const Referee = db.referees;
const Op = db.Sequelize.Op;

// Create and Save a new Referee
exports.create = (req, res) => {
  // Validate request
  console.log("req body");
  console.log(req.body);
  console.log("req params");
  console.log(req.params);
  console.log("req data");
  console.log(req.data);
  if (!req.body.r_id || !req.body.r_name || !req.body.r_age || !req.body.r_location) {
    console.log("help");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const referee = {
    r_id: req.body.r_id,
    r_name: req.body.r_name,
    r_age: req.body.r_age,
    rr: 0,
    fpr: 0,
    r_location: req.body.r_location,
    available_locations: [],
    dates: [],
    matches: [],
    r_notifications: []
  };

  // Save Referee in the database
  Referee.create(referee)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Referee."
      });
    });
};

// Retrieve all Referees from the database.
exports.findAll = (req, res) => {
  var condition = req ? req : null;

  Referee.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          "Some error occurred while retrieving referees."
      });
    });
};

// Find a single Referee with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Referee.findByPk(id)
    .then(data => {
      console.log(data);
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Referee with r_id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Referee with r_id=" + id
      });
    });
};

// Update a Referee by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Referee.update(req.body, {
    where: { r_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Referee was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Referee with r_id=${id}. Maybe Referee was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating player with p_id=" + id
      });
    });
};

// Delete a Referee with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Referee.destroy({
    where: { r_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Referee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Referee with r_id=${id}. Maybe Referee was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Referee with r_id=" + id
      });
    });
};

// Delete all Referees from the database.
exports.deleteAll = (req, res) => {
  Referee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Referees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all referees."
      });
    });
};

exports.pushNotification = (req, res) => {
  console.log("hey");
  const id = req.params.id;
  const notif = req.body

  Referee.findByPk(id)
    .then(data => {
      let array = data.dataValues.r_notifications
      notif.id = "id" + Math.random().toString(16).slice(2)
      array.push(notif)
      data.dataValues.r_notifications = array

      Referee.update(data.dataValues, {
        where: { r_id: id }
      }).then(num => {
        console.log("hey");
        if (num == 1) {
          res.send({
            message: "Referee was notified successfully."
          });
        } else {
          res.send({
            message: `Cannot notify Referee with r_id=${id}. Maybe Referee was not found or req.body is empty!`
          });
        }
      })
    })
}

exports.deleteNotification = (req, res) => {
  const rid = req.params.rid
  const nid = req.params.nid
  Referee.findByPk(rid)
    .then(data => {
      let array = data.dataValues.r_notifications
      array.splice(array.findIndex(x => x.id === nid), 1)
      data.dataValues.r_notifications = array

      Referee.update(data.dataValues, {
        where: { r_id: rid }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Notification was deleted successfully."
          });
        } else {
          res.send({
            message: "Couldn't delete the notification"
          });
        }
      })
    })
}

// Add match
exports.addMatch = (req, res) => {
  const rid = req.params.rid
  const mid = req.params.mid
  Referee.findByPk(rid)
    .then(data => {
      let array = data.dataValues.matches
      array.push(mid)
      data.dataValues.matches = array
      Referee.update(data.dataValues, {
        where: { r_id: rid }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Referee joined match successfully."
          });
        } else {
          res.send({
            message: "Referee couldn't join the match."
          });
        }
      })
    })
}

exports.deleteMatch = (req, res) => {
  const rid = req.params.rid
  const mid = req.params.mid
  Referee.findByPk(rid)
    .then(data => {
      let array = data.dataValues.matches
      array.splice(array.indexOf(mid), 1)
      data.dataValues.matches = array
      Referee.update(data.dataValues, {
        where: { r_id: rid }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Referee exited match successfully."
          });
        } else {
          res.send({
            message: "Referee couldn't exit the match."
          });
        }
      })
    })
}