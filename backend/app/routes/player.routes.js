module.exports = app => {
    const players = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new player
    router.post("/", players.create);
  
    // Retrieve all players
    router.get("/", players.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", players.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", players.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", players.delete);
  
    // Delete all players
    router.delete("/", players.deleteAll);

    router.delete("/:pid/:mid", players.deleteMatch)

    // Search players by name
    router.get("/:name", players.searchAll);

    //Push notification by name
    router.put("/notify/:id", players.pushNotification);
    
    router.delete("/notify/:pid/:nid", players.deleteNotification)

    router.put("/:pid/:mid", players.addMatch)

    app.use("/api/players", router);
  };