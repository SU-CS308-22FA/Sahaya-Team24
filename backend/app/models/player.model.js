const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Player = sequelize.define("player", {
      p_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      p_name: {
        type: Sequelize.STRING
      },
      p_age: {
        type: Sequelize.INTEGER
      },
      p_rating:{
        type: DataTypes.ARRAY(Sequelize. DOUBLE)//0:total rating 1:total fprating 2:#ofratings
      },
      position_a: {
        type: Sequelize.STRING
      },
      position_b: {
        type: Sequelize.STRING
      },
      p_location: {
        type: Sequelize.STRING
      },
      p_notification: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      matches: {
        type: DataTypes.ARRAY(Sequelize.STRING)
      }
    });
  
    return Player;
  };

  