var cron = require('node-cron');
const sendEmail = require('./sendEmail')
const db = require("../app/models");
const Player = db.players;
const Match = db.matches
const constants = require('../constants')
const app = require('../firebase/firebase')
const admin = require('../firebase/firebaseAdmin')
async function schedule(){
    
    cron.schedule('00 20 * * *', async () => {
        for(let i = 0; i < constants.LOCATION_ARRAY.length; i++) await emailOnLocation(constants.LOCATION_ARRAY[i].toLowerCase())
    })

}

module.exports = schedule


const emailOnLocation = async (location) => {
    
    var playersToSend = await Player.findAll({where:{
        p_location: location
    }})
    var emails = ""
    for(let i = 0; i < playersToSend.length; i++) {
        var mail = await admin.auth().getUser(playersToSend[i].dataValues.p_id)
        emails+=mail.email
        emails+=', '
    }
    if(emails != '') {
        emails.slice(0,-2)
        var matches = await Match.findAll({where:{
            m_location:location
        }})
        var count = matches.length

        mailOptions = {
            from: 'susahaya24@gmail.com',
            to: emails,
            subject: 'Hadi Sahaya!',
            text: `Cevrende ${count} adet maç var! Oynamak için hemen Sahaya!`
        }
    
        sendEmail(mailOptions)
    }
    
}
/*const sendEmail = require("./sendEmail")
var mailOptions = { //Example email format you can use html instead of text
  from: 'susahaya24@gmail.com',
  to: 'ahmethanozcancs@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};
sendEmail(mailOptions)*/