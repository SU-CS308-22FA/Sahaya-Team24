
module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
      p_id: {
        type: Sequelize.STRING
      },
      p_name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      pr: {
        type: Sequelize.INTEGER
      },
      fpr: {
        type: Sequelize.INTEGER
      },
      position_a: {
        type: Sequelize.STRING
      },
      position_b: {
        type: Sequelize.STRING
      },
      p_location: {
        type: Sequelize.STRING
      }
    });
  
    return Player;
  };