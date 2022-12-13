module.exports = app => {
  const dates = require("../controllers/dates.controller.js");

  var router = require("express").Router();

  // Create a new date
  router.post("/", dates.create);

  app.use("/api/dates", router);
};