var cron = require('node-cron');
const sendEmail = require('./sendEmail')
const db = require("../app/models");
const Player = db.players;
const constants = require('../constants')

async function schedule(){
    
    cron.schedule('00 18 * * *', async () => {
        for(let i = 0; i < constants.LOCATION_ARRAY.length; i++) await emailOnLocation(constants.LOCATION_ARRAY[i].toLowerCase())
    })

}

module.exports = schedule


const emailOnLocation = async (location) => {
    
    var playersToSend = await Player.findAll({where:{
        p_location: location
    }})
    console.log(playersToSend)
    mailOptions = {
        from: 'susahaya24@gmail.com',
        to: 'ahmethanozcancs@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    }

    //sendEmail(mailOptions)
}
/*const sendEmail = require("./sendEmail")
var mailOptions = { //Example email format you can use html instead of text
  from: 'susahaya24@gmail.com',
  to: 'ahmethanozcancs@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
sendEmail(mailOptions)*/