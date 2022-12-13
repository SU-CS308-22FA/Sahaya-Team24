const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const schedule = require('./email/schedule')

schedule()

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sahaya application." });
});

require("./app/routes/player.routes")(app);
require("./app/routes/match.routes")(app);
require("./app/routes/referee.routes")(app);
require("./app/routes/dates.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
