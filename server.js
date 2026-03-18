const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user');
const mainRoutes = require('./routes/main');

const app = express();
app.use(express.json());

// Usando as rotas de usuário
app.use('/usuarios', userRoutes);
app.use('/', mainRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});