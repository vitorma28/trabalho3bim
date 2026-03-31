const express = require('express');
const { verifyJWT } = require('../middlewares/verifyJWT.js');
const router = express.Router();


router.get('/', verifyJWT, (req, res) => {});

router.get('/:id', verifyJWT, (req, res) => {});

router.post('/', verifyJWT, (req, res) => {});

router.delete('/:id', verifyJWT, (req, res) => {});

router.post('/:id', verifyJWT, (req, res) => {});


module.exports = router;
