const db = require("../models");
var cron = require('node-cron');
const Match = db.matches;
const Player = db.players;
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
        m_curPlayer: 1,
        m_needRefree: req.body.m_needRefree,
        m_date: req.body.m_date,
        owner_id: req.body.owner_id,
        players: [req.body.owner_id],
        waitingList:[],
        referee: ''
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

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Match.findByPk(id)
      .then(data => {
        console.log(data);
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Match with m_id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Match with m_id=" + id
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
        data.dataValues.m_curPlayer = data.dataValues.m_curPlayer+1
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

  exports.deletePlayer = (req,res) => {
    const pid = req.params.pid
    const mid = req.params.mid
    Match.findByPk(mid)
      .then(data => {
        console.log(mid,data)
        let array = data.dataValues.players
        array.splice(array.indexOf(pid),1)
        data.dataValues.players = array
        data.dataValues.m_curPlayer = data.dataValues.m_curPlayer-1
        Match.update(data.dataValues, {
          where: { m_id: mid }
        }).then(num => {
          if (num == 1) {
            res.send({
              message: "Player deleted from match successfully."
            });
          } else {
            res.send({
              message: "Player couldn't get deleted from the match."
            });
          }
        })
      })
  }

  exports.addWaiting = (req,res) => {
    const pid = req.params.pid
    const mid = req.params.mid
    Match.findByPk(mid)
      .then(data => {
        let array = data.dataValues.waitingList
        array.push(pid)
        data.dataValues.waitingList = array
        Match.update(data.dataValues, {
          where: { m_id: mid }
        }).then(num => {
          if (num == 1) {
            res.send({
              message: "Player joined waiting list successfully."
            });
          } else {
            res.send({
              message: "Player couldn't join the waiting list."
            });
          }
        })
      })
  }
  exports.deleteWaiting = (req,res) => {
    const pid = req.params.pid
    const mid = req.params.mid
    Match.findByPk(mid)
      .then(data => {
        let array = data.dataValues.waitingList
        array.splice(array.indexOf(pid),1)
        data.dataValues.waitingList = array
        Match.update(data.dataValues, {
          where: { m_id: mid }
        }).then(num => {
          if (num == 1) {
            res.send({
              message: "Player deleted from waiting list successfully."
            });
          } else {
            res.send({
              message: "Player couldn't delete from the waiting list."
            });
          }
        })
      })
  }

  //finds matches under filter
  exports.findAll = (req, res) => {
    console.log("req:",req);
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

  //finds the match with given id
  exports.findById = (req, res) =>{
    const id = req.params.id;
    Match.findAll({ where: {m_id: id} })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving matches."
      });
    });

  }


  //sends messages to players of the match after 2hr from match date
  const handleMatchNotifications = ( m ) => {
    console.log("handling not")
    let matchDate = m.m_date;
    var date = new Date(matchDate);
    date.setHours(date.getHours() + 2);

    //var year = date.getFullYear().toString() ;
    var month = ((date.getMonth()+1).toString());
    
    var day = (date.getDate().toString());

    var hr = (date.getHours()) .toString();
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
    
    console.log( "time is: " ,  schedule_time);
    //console.log(cron.validate(schedule_time));
    cron.schedule(schedule_time, async ()=>{

        Match.findByPk(m.m_id)
        .then(async (newM)=>{  
        m = newM;
        console.log("match is over");
        let ps = m.players;
        console.log(ps);
        
        const notification = {
          "type": "RatePlayers",
          "senderID":`${m.owner_id}`,
          "matchID": `${m.m_id}`,
          "header": "Now you can Rate!",
          "message" : `You can submit your raitngs for the players in ${m.m_name} lobby`
        }
        
       for (let index = 0; index < ps.length; index++) {
          playerTosend = await Player.findAll({where:{
            p_id: ps[index]
        }})
        console.log("ptsis: " , playerTosend)
        try {
          pushNotification_to(ps[index],notification);
          console.log("message ha been sent to " ,ps[index], " in " , m.m_name )
        } catch (error) {
          console.log(error);
        }
          
       }
       
      })
    })
}

//Send notification n to player with pid
// n = json obj with type header mesage
//pid is id of the user from database
pushNotification_to = (pid , n) => {
  const id = pid;
  const notif = n
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
          
            console.log( "Player was notified successfully.");
        } else {
            console.log(`Cannot notify Player with p_id=${id}. Maybe Player was not found or req.body is empty!`)
          
        }
      })
    })
}
