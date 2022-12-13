module.exports = app => {
  const dates = require("../controllers/dates.controller.js");

  var router = require("express").Router();

  // Create a new date
  router.post("/", dates.create);

  router.get("/", dates.findAll);

  router.get("/:id", dates.findWithID);

  router.delete("/:date", dates.delete);

  app.use("/api/dates", router);
};