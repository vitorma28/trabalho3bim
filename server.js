const routes = './routes/';

const express = require('express');
const { config: configRelationship } = require('./config/config_relationships.js');
const sequelize = require('./config/database.js');

const userRoutes = require(routes + 'user.js');
const mainRoutes = require(routes + 'main.js');
const profileRoutes = require(routes + 'profile.js');

const app = express();
app.use(express.json());

// Usando as rotas de usuário
app.use('/usuarios', userRoutes);
app.use('/profile', profileRoutes);
app.use('/', mainRoutes);

configRelationship();

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});