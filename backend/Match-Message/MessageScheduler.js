import React from 'react'
var cron = require('node-cron');
const db = require("../app/models");
const Player = db.players;
const Match = db.matches;
const Refree = db.referees;

    cron.schedule('* * * * * * ' , async()=>{
        Match

    })