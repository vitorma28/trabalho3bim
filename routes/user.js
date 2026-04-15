const express = require('express');
const User = require('../models/User.js');
const { verifyJWT } = require('../middlewares/verifyJWT.js');

const router = express.Router();

router.patch('/:id', verifyJWT, async (req, res) => {});

router.delete('/:id', verifyJWT, async (req, res) => {});

router.get('/', verifyJWT, async (req, res) => {});

module.exports = router;
