module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "mustafa123", 
    DB: "sahayadb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };