const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequilize");
const Utilisateur = sequelize.define(
  "utilisateur",
  {
    ID_UTILISATEUR: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    NOM: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    PRENOM: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    EMAIL:{
        type:DataTypes.STRING(40),
        allowNull:false
    },
    MOT_DE_PASSE:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    DATE_INSERTION:{
      type:DataTypes.DATE,
      allowNull:false,
      defaultValue:DataTypes.NOW
    }
  },
  {
    freezeTableName: true,
    tableName: "utilisateur",
    timestamps: false,
  }
);


module.exports = Utilisateur;