const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// Usando as rotas de usuário
app.use('/usuarios', userRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});