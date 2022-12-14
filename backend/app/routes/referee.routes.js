module.exports = app => {
  const referees = require("../controllers/referee.controller.js");

  var router = require("express").Router();

  // Create a new referee
  router.post("/", referees.create);

  // Retrieve all referees
  router.get("/", referees.findAll);

  // Retrieve a single referee
  router.get("/:id", referees.findOne);

  // Update a referee
  router.put("/:id", referees.update);

  // Delete a referee
  router.delete("/:id", referees.delete);

  // Delete all referees
  router.delete("/", referees.deleteAll);
  
  // Notification
  router.put("/notify/:id", referees.pushNotification);
  
  router.delete("/:rid/:mid", referees.deleteMatch)
  
  // Match
  router.put("/:rid/:mid", referees.addMatch);

  router.delete("/notify/:rid/:nid", referees.deleteNotification)

  app.use("/api/referees", router);
};
