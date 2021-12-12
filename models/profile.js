module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Profile",
    {
      birthDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sex: {
        type: DataTypes.STRING(3),
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
};
