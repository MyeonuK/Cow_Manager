const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
//const env = process.env.NODE_ENV || "production";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize; // 나중에 연결 객체 재사용을 위해 넣어둠
db.Sequelize = Sequelize;
db.Profile = require("./profile")(sequelize, Sequelize);
db.Vaccin = require("./vaccin")(sequelize, Sequelize);

module.exports = db;
