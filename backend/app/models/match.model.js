
module.exports = (sequelize, Sequelize) => {
    const Match = sequelize.define("match", {
      m_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      m_name: {
        type: Sequelize.STRING
      },
      m_location: {
        type: Sequelize.STRING
      },
      m_maxPlayer: {
        type: Sequelize.INTEGER
      },
      m_curPlayer: {
        type: Sequelize.INTEGER
      },
      m_needRefree: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      m_date : {
        type: Sequelize.STRING,//changed from DATE
      },
      owner_id:{
        type: Sequelize.STRING,
      },
    });
    return Match;
  };