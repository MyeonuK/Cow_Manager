module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Profile",
    {
      famInfo: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      famDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      bruInfo: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      bruDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      tubeInfo: {
        type: DataTypes.STRING(5),
        allowNull: true,
      },
      tubeDate: {
        type: DataTypes.DATE,
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
};
