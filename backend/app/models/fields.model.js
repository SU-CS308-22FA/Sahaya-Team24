module.exports = (sequelize, Sequelize) => {
  const Matchfield = sequelize.define("matchfield", {
    f_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    f_name: {
      type: Sequelize.STRING
    },
    f_location: {
      type: Sequelize.STRING
    },
  });

  return Matchfield;
};