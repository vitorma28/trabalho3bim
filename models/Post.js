const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Comentario = require('./Comentario');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Post;