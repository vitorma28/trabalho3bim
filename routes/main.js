const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
require('dotenv').config();

const SECRET = process.env.JWTSECRET;

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    // Cria um usuário com as infos.

    // Obtemos informações
    const { id, email, _senha } = req.body;

    try {
        const senha = await bcrypt.hash(_senha, process.env.SALT_COST);

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

        res.json({
            message: `Usuário com id ${id}, email ${email} e senha ${senha} foi cadastrado.`
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erro ao cadastrar usuário"
        });
    }
});

async function loginById(req, res) {
    // Obtenho id e senha
    const { id, senha } = req.body;

    try {
        // Busco o usuário pelo id
        const user = await User.findByPk(id);

        // Verifico se não existe
        if (!user) {
            return res.status(404).json({
                message: `Usuário com o ID ${id} não existe.`
            });
        }

        // Verifico se a senha está errada
        const senhaEquivalente = await bcrypt.compare(user.senha, senha);
        if (!senhaEquivalente) {
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

        return res.json({
            message: `Login bem-sucedido`,
            token
        });
    }
    catch (error) {
        return res.status(500).json({
            message: `Erro ao fazer login.`,
            error
        });
    }
}

async function loginByEmail(req, res) {
    // Obtenho email e senha
    const { email, senha } = req.body;

    try {
        // Busco o usuário pelo email
        const user = await User.findOne({ where: { email } });

        // Verifico se não existe
        if (!user) {
            return res.status(404).json({
                message: `Usuário com o email ${email} não existe.`
            });
        }

        // Verifico se a senha está errada
        const senhaEquivalente = await bcrypt.compare(user.senha, senha);
        if (!senhaEquivalente) {
            return res.status(401).json({
                message: `Senha incorreta.`
            });
        }

        // Crio o payload
        const payload = {
            userId: user.id
        };

        // Gero o token
        const token = jwt.sign(payload, SECRET, {
            expiresIn: '1h'
        });

        // Retorno o token
        return res.status(200).json({
            message: 'Login realizado com sucesso',
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Erro interno do servidor'
        });
    }
}

router.post('/login', loginById);

router.post('/login/id', loginById);

router.post('/login/email', loginByEmail);

module.exports = router;
