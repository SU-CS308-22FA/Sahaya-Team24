module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "ankara123", 
    DB: "sahayadb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
