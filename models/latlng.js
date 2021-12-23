const Sequelize = require("sequelize");

module.exports = class LatLng extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          references: { model: "Territory", key: "code" },
          allowNull: false,
        },
        number: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        lat: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        lng: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "LatLng",
        tableName: "LatLng",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.LatLng.removeAttribute("id");

    db.LatLng.belongsTo(db.Territory, {
      foreignKey: "code",
      sourceKey: "code",
    });
  }
};
