module.exports = app => {
    const players = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new player
    router.post("/", players.create);
  
    // Retrieve all players
    router.get("/", players.findAll);
  
    // Retrieve all published players
    router.get("/published", players.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", players.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", players.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", players.delete);
  
    // Delete all players
    router.delete("/", players.deleteAll);
  
    app.use("/api/players", router);
  };