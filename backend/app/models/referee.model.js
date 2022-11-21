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
    }
  });

  return Referee;
};