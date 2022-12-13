module.exports = (sequelize, Sequelize) => {
  const Date = sequelize.define("date", {
    date: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    r_id: {
      type: Sequelize.STRING,
    }
  });

  return Date;
};
