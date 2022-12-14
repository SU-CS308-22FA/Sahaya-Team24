
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.players = require("./player.model.js")(sequelize, Sequelize);
db.referees = require("./referee.model.js")(sequelize, Sequelize);
db.matches = require("./match.model.js")(sequelize, Sequelize);
db.dates = require("./dates.model.js")(sequelize, Sequelize);

module.exports = db;