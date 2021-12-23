/*
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "House",
    {
      id: {
        type: DataTypes.STRING(15),
        primaryKey: true,
        references: { model: "Profile", key: "id" },
        allowNull: false,
      },
      house: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      side: {
        type: DataTypes.STRING(1),
        allowNull: true,
      },
      room: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: "House",
      tableName: "House",
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
};
*/

const Sequelize = require("sequelize");

module.exports = class House extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          //references: { model: "Profile", key: "id" },
          allowNull: false,
        },
        house: {
          type: Sequelize.STRING(1),
          allowNull: false,
        },
        side: {
          type: Sequelize.STRING(1),
          allowNull: true,
        },
        room: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "House",
        tableName: "House",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.House.belongsTo(db.Profile, { foreignKey: "id", sourceKey: "id" });
  }
};
