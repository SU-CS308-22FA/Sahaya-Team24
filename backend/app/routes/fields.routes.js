module.exports = app => {
  const matchfields = require("../controllers/fields.controller.js");

  var router = require("express").Router();

  // Create a new matchfields
  router.post("/", matchfields.create);

  // Retrieve all matchfields
  router.get("/", matchfields.findAll);

  app.use("/api/matchfields", router);
};