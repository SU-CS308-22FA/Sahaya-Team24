module.exports = app => {
    const matches = require("../controllers/match.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Match
    router.post("/", matches.create);

    //Delete match with id
    router.delete("/:id", matches.delete);

    router.get("/", matches.findAll);

    

    // Update a Match with id
    router.put("/:id", matches.update);

    router.put("/:mid/:pid", matches.addPlayer)
    router.delete("/:mid/:pid", matches.deletePlayer)

    router.put("/waiting/:mid/:pid", matches.addWaiting)
    router.delete("/waiting/:mid/:id", matches.deleteWaiting);

    //retruns match with id
    router.get("/:id", matches.findOne);

    app.use("/api/matches", router);
  };