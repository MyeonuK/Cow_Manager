const Sequelize = require("sequelize");

module.exports = class Profile extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.STRING(15),
          primaryKey: true,
          allowNull: false,
        },
        birthDate: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        age: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        sex: {
          type: Sequelize.STRING(3),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Profile",
        tableName: "Profile",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Profile.hasOne(db.House, { foreignKey: "id", sourceKey: "id" });
    db.Profile.hasOne(db.Vaccin, { foreignKey: "id", sourceKey: "id" });
  }
};
