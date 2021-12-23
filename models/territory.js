const Sequelize = require("sequelize");

module.exports = class Territory extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        region: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        address: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Territory",
        tableName: "Territory",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Territory.removeAttribute("id");

    db.Territory.hasMany(db.LatLng, { foreignKey: "code", sourceKey: "code" });
  }
};
