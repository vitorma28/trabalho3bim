const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//perfil
//não colocamos usuarioId aqui porque o Sequelize cria automaticamente pela associaçao
const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  bio: {
    type: DataTypes.TEXT
  },
  foto: {
    type: DataTypes.STRING
  }
});

module.exports = Profile;