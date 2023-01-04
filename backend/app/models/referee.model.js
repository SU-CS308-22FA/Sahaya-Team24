module.exports = (sequelize, Sequelize) => {
  const Referee = sequelize.define("referee", {
    r_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    r_name: {
      type: Sequelize.STRING
    },
    r_age: {
      type: Sequelize.INTEGER
    },
    rr: {
      type: Sequelize.INTEGER
    },
    fpr: {
      type: Sequelize.INTEGER
    },
    r_location: {
      type: Sequelize.STRING
    },
    available_locations: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    dates: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    matches: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    r_notifications: {
      type: Sequelize.ARRAY(Sequelize.JSON)
    }
  });

  return Referee;
};
