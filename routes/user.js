const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User.js');
const { verifyJWT } = require('../middlewares/verifyJWT.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = User.findAll({
            include: [ 'id' ]
        });

        return res.json(users);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Incapaz de pegar usuários."
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: `Usuário ${id} não encontrado.`
            });
        }

        return res.json(user);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `Incapaz de obter usuário ${id}.`
        });
    }
});

router.patch('/', verifyJWT, async (req, res) => {
    const id = req.user.id;
    const { email, senha } = req.body;
    
    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                message: `Usuário ${id} não encontrado.`
            });
        }

        if (email) user.email = email;

        if (senha) {
            user.senha = await bcrypt.hash(senha, process.env.SALT_COST);
        }

        await user.save();

        return res.json({
            message: `Usuário ${id} alterado com sucesso.`
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `Incapaz de modificar usuário ${id}.`
        });
    }
});

router.delete('/', verifyJWT, async (req, res) => {
    const id = req.user.id;

    try {
        const deletedUser = User.destroy({
            where: {
                id
            }
        })
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: `Incapaz de remover usuário ${id}.`
        });
    }
});

module.exports = router;
