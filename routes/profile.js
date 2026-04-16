const express = require('express');
const { verifyJWT } = require('../middlewares/verifyJWT.js');
const Profile = require('../models/Profile.js');

const router = express.Router();


router.get('/', verifyJWT, async (req, res) => {
    const userId = req.user.userId;

    try {
        const profiles = await Profile.findAll({
            where: {
                userId
            },
            attributes: [ 'id', 'nome', 'bio' ]
        });
    

        return res.json(profiles);
    }
    catch (err) {
        console.error('Erro ao buscar perfis:\n', err);
        return res.status(500).json({ msg: "Erro ao buscar perfis"})
    }
});

router.get('/:id', verifyJWT, async (req, res) => {
    const userId = req.user.userId;
    const profileId = req.params.id;

    try {
        const profile = await Profile.findOne({
            where: {
                id: profileId,
                userId
            },
            attributes: [ 'id', 'nome', 'bio' ]
        });

        if (!profile) {
            return res.status(404).json({
                message: `Nenhum perfil de id ${profileId} foi encontrado no usuário ${userId}`
            });
        }

        return res.json(profile);
    }
    catch (err) {
        console.error('Erro ao buscar perfis:\n', err);
        return res.status(500).json({ msg: "Erro ao buscar perfil"})
    }
});

router.post('/', verifyJWT, async (req, res) => {
    const userId = req.user.userId;
    const { nome, bio } = req.body;

    if (!nome) {
        return res.status(400).json({
            message: "Nome vazio. Por favor, coloque um nome."
        });
    }

    try {
        await Profile.create({ nome, bio, userId });

        return res.json({
            message: "Perfil criado com sucesso."
        })
    }
    catch (err) {
        console.error('Erro ao buscar perfis:\n', err);
        return res.status(500).json({ msg: "Erro ao criar perfil"})
    }
});

router.delete('/:id', verifyJWT, async (req, res) => {
    const userId = req.user.userId; 
    const profileId = req.params.id;

    try {
        const rowsDeleted = await Profile.destroy({
            where: {
                id: profileId,
                userId: userId
            }
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({
                message: `Perfil não encontrado.`
            });
        }
        
        return res.json({
            message: `Perfil ${profileId} foi removido com sucesso`
        })
    }
    catch (err) {
        console.error('Erro ao buscar perfis:\n', err);
        return res.status(500).json({ msg: "Erro ao remover perfil"})
    }
});

router.patch('/:id', verifyJWT, async (req, res) => {
    const userId = req.user.userId;
    const profileId = req.params.id;

    const { bio, nome } = req.body;

    try {
        const profile = await Profile.findOne({
            where: {
                userId,
                id: profileId
            }
        });

        if (!profile) {
            return res.status(404).json({
                message: `Perfil ${profileId} não encontrado`
            });
        }

        if (bio) profile.bio = bio;

        if (nome) profile.nome = nome;

        await profile.save();

        return res.json({
            message: `Perfil ${profileId} alterado com sucesso.`
        });
    }
    catch (err) {
        console.error('Erro ao buscar perfis:\n', err);
        return res.status(500).json({ msg: "Erro ao atualizar perfis"})
    }
});


module.exports = router;
