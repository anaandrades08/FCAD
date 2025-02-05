const express = require('express');
const router = express.Router();
const { getExample } = require('../controllers/exampleController.js');

// Usar o controlador diretamente na rota
router.get('/', getExample);


module.exports = router;
module.exports = router;
