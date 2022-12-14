const db = require("../models");
const Player = db.players;
const Op = db.Sequelize.Op;

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  console.log("req body");
  console.log(req.body);
  console.log("req params");
  console.log(req.params);
  console.log("req data");
  console.log(req.data);
  if (!req.body.p_id || !req.body.p_name || !req.body.p_age || !req.body.position_a || !req.body.position_b || !req.body.p_location) {
    console.log("help");
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Player
  const player = {
    p_id: req.body.p_id,
    p_name: req.body.p_name,
    p_age: req.body.p_age,
    p_rating: [0,0,0],
    position_a: req.body.position_a,
    position_b: req.body.position_b,
    p_location: req.body.p_location,
    p_notification: [],
    matches: []
  };

  // Save Player in the database
  Player.create(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  var condition = req ? req : null;

  Player.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};

// Search by player name
exports.searchAll = (req, res) => {
  var searchElement = req.params.p_name;
  Player.findAll({
    where: {
      p_name: {
        [Op.like]: searchElement
      }
    }
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving players."
    });
  })
}

// Find a single Player with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Player.findByPk(id)
    .then(data => {
      console.log(data);
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Player with p_id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Player with p_id=" + id
      });
    });
};

// Update a Player by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Player.update(req.body, {
    where: { p_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Player was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Player with p_id=${id}. Maybe Player was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating player with p_id=" + id
      });
    });
};

exports.pushNotification = (req,res) => {
  const id = req.params.id;
  const notif = req.body
  console.log(req.params.id)
  console.log(req.body)
  Player.findByPk(id)
    .then(data => {
      let array = data.dataValues.p_notification
      notif.id="id" + Math.random().toString(16).slice(2)
      array.push(notif)
      data.dataValues.p_notification = array
      console.log(data.dataValues)
      Player.update(data.dataValues, {
        where: { p_id: id }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Player was notified successfully."
          });
        } else {
          res.send({
            message: `Cannot notify Player with p_id=${id}. Maybe Player was not found or req.body is empty!`
          });
        }
      })
    })
}

exports.deleteNotification = (req,res) => {
  const pid = req.params.pid
  const nid = req.params.nid
  Player.findByPk(pid)
    .then(data => {
      let array = data.dataValues.p_notification
      array.splice(array.findIndex(x => x.id === nid),1)
      data.dataValues.p_notification = array
      console.log(data.dataValues)
      Player.update(data.dataValues, {
        where: { p_id: pid }
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



exports.addMatch = (req,res) => {
  const pid = req.params.pid
  const mid = req.params.mid
  Player.findByPk(pid)
    .then(data => {
      let array = data.dataValues.matches
      array.push(mid)
      data.dataValues.matches = array
      Player.update(data.dataValues, {
        where: { p_id: pid }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Player joined match successfully."
          });
        } else {
          res.send({
            message: "Player couldn't join the match."
          });
        }
      })
    })
}

exports.deleteMatch = (req,res) => {
  const pid = req.params.pid
  const mid = req.params.mid
  Player.findByPk(pid)
    .then(data => {
      let array = data.dataValues.matches
      array.splice(array.indexOf(mid),1)
      data.dataValues.matches = array
      Player.update(data.dataValues, {
        where: { p_id: pid }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Player exited match successfully."
          });
        } else {
          res.send({
            message: "Player couldn't exit the match."
          });
        }
      })
    })
}

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Player.destroy({
    where: { p_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Player was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Player with p_id=${id}. Maybe Player was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Player with p_id=" + id
      });
    });
};

// Delete all Players from the database.
exports.deleteAll = (req, res) => {
    Player.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Players were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all players."
      });
    });
};

// find all published Player
exports.findAllPublished = (req, res) => {
    Player.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};