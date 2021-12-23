const Sequelize = require("sequelize");

module.exports = class Vaccin extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          references: { model: "Profile", key: "id" },
          allowNull: false,
        },
        famInfo: {
          type: Sequelize.STRING(5),
          allowNull: true,
        },
        famDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        bruInfo: {
          type: Sequelize.STRING(5),
          allowNull: true,
        },
        bruDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        tubeInfo: {
          type: Sequelize.STRING(5),
          allowNull: true,
        },
        tubeDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Vaccin",
        tableName: "Vaccin",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Vaccin.belongsTo(db.Profile, { foreignKey: "id", sourceKey: "id" });
  }
};
