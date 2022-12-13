module.exports = app => {
  const dates = require("../controllers/dates.controller.js");

  var router = require("express").Router();

  // Create a new date
  router.post("/", dates.create);

  router.get("/", dates.findAll);

  app.use("/api/dates", router);
};