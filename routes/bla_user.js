const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

// ROTA: Criar um novo usuário
/* router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ROTA: Listar todos os usuários
router.get('/', async (req, res) => {
  try {
    
    const users = await User.findAll({
      attributes: { exclude: ['senha'] } // Segurança: não envia a senha no JSON
    });
    res.json(users);

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
});

// ROTA: Buscar um usuário por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ROTA: Atualizar um usuário
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
    
    await user.update(req.body);
    res.json({ mensagem: 'Usuário atualizado com sucesso', user });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// ROTA: Deletar um usuário
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
    
    await user.destroy();
    res.json({ mensagem: 'Usuário removido com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}); */

module.exports = router;