module.exports = app => {
    const matches = require("../controllers/match.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Match
    router.post("/", matches.create);
    app.use("/api/matches", router);
  };