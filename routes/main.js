const express = require('express');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/User');

require('dotenv').config();

const SECRET = process.env.JWTSECRET;

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    // Cria um usuário com as infos.

    // Obtemos informações
    const { id, email, senha } = req.body;

    // Verificar se já existe um usuário assim
    const usersId = await User.findAll({
        where: {
            id: id
        }
    });

    if (usersId.length != 0) {
        return res.status(409).json({
            message: "Já existe um usuário com esse id."
        });
    }

    const usersEmail = await User.findAll({
        where: {
            email: email
        }
    });

    if (usersEmail.length != 0) {
        return res.status(409).json({
            message: "Já existe um usuário com esse email."
        });
    }


    // Criar usuário

    await User.create({ id, email, senha });
});

async function loginById(req, res) {
    // Obtenho id e senha
    const { id, senha } = req.body;

    // Busco o usuário pelo id
    const user = User.findByPk(id);

    // Verifico se não existe
    if (!user) {
        return res.status(404).json({
            message: `Usuário com o ID ${id} não existe.`
        });
    }

    // Verifico se a senha está errada
    if (user.senha != senha) {
        return res.status(401).json({
            message: `Senha incorreta.`
        });
    }

    // Retorno o token

    const payload = {
        userId: id
    };

    const token = jwt.sign(payload, SECRET, {
        expiresIn: '1h'
    });

    return token;
}

router.post('/login', loginById);

router.post('/login/id', loginById);

router.post('/login/email', async (req, res) => {});

module.exports = router;
