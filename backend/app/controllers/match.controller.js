const db = require("../models");
var cron = require('node-cron');
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
    if (req.body.m_id == "" || req.body.m_name == "" || req.body.m_location == "" || req.body.m_date == ""|| req.body.m_maxPlayer == null || req.body.owner_id == "" ) {//checks will be add
      console.log("help");
      res.status(400).send({
        message: "Match content can not be empty!"
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
        m_date: req.body.m_date,
        owner_id: req.body.owner_id,
        players: [req.body.owner_id]
    };
  
    // Save Match in the database
    Match.create(match)
      .then(data => {
        handleMatchNotifications(match);
        res.send(data);

      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the match."
        });
      });
  };

  exports.addPlayer = (req,res) => {
    const pid = req.params.pid
    const mid = req.params.mid
    Match.findByPk(mid)
      .then(data => {
        let array = data.dataValues.players
        array.push(pid)
        data.dataValues.players = array
        Match.update(data.dataValues, {
          where: { m_id: mid }
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

  //finds matches under filter
  exports.findAll = (req, res) => {
    console.log("CONTROLLER FINDALL");
    var condition = req ? req : null;
    Match.findAll({ where: condition })
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

  //Delete the match with specific id
  exports.delete = (req,res) =>{
    const id = req.params.id;
    console.log(id);
    Match.destroy({
      where: {m_id: id}
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Match was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Match with id=${id}. Maybe Match was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Match with id=" + id
      });
    });
  };

  exports.update = (req, res) => {
    const id = req.params.id;
  
    Match.update(req.body, {
      where: { m_id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Match was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Match with id=${id}. Maybe Match was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Match with id=" + id
        });
      });
  };


  const handleMatchNotifications = ( m ) => {
    
    let matchDate = m.m_date;
    var date = new Date(matchDate);
    

    //var year = date.getFullYear().toString() ;
    var month = ((date.getMonth()+1).toString());
    var day = (date.getDate().toString());

    var hr = date.getHours().toString();
    var min = date.getMinutes().toString();

    if(parseInt(month) < 10 ){
        month = '0' + month;
    }
    if(parseInt(day) < 10 ){
      day = '0' + day;
    }
    if(parseInt(hr) < 10 ){
      hr = '0' + hr;
    }
    if(parseInt(min) < 10 ){
      min = '0' + min;
    }

    let schedule_time = min + " " + hr + " " + day + " " + month + " * " ;
    
    //console.log( "time is: " ,  schedule_time);
    //console.log(cron.validate(schedule_time));
    cron.schedule(schedule_time, async()=>{
        console.log("match is over");
        

    })
}