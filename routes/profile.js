const express = require('express');
const { verifyJWT } = require('../middlewares/verifyJWT.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

const router = express.Router();


router.get('/', verifyJWT, async (req, res) => {
    const userId = req.user.userId;

    try {
        const profiles = await Profile.findAll({
            where: {
                userId
            }
        });
    

        return res.json(profiles);
    }
    catch (err) {
        console.error('Erro ao buscar perfis:\n', err);
        return res.status(500).json({ msg: "Erro ao buscar perfis"})
    }
});

router.get('/:id', verifyJWT, async (req, res) => {});

router.post('/', verifyJWT, async (req, res) => {});

router.delete('/:id', verifyJWT, async (req, res) => {});

router.post('/:id', verifyJWT, async (req, res) => {});


module.exports = router;
