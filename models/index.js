const Sequelize = require("sequelize");

//const env = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV || "production";
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

db.Profile = require("./profile");
db.House = require("./house");
db.Vaccin = require("./vaccin");
db.Territory = require("./territory");
db.LatLng = require("./latlng");

db.Profile.init(sequelize);
db.House.init(sequelize);
db.Vaccin.init(sequelize);
db.Territory.init(sequelize);
db.LatLng.init(sequelize);

db.Profile.associate(db);
db.House.associate(db);
db.Vaccin.associate(db);
db.Territory.associate(db);
db.LatLng.associate(db);

module.exports = db;
