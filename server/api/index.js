const express = require('express');
const router = express.Router();
const exampleRoute = require('./routes/exampleRoute.js');
const usersRoute = require('./routes/usersRoute.js');

// Use as rotas importadas
router.use('/route', exampleRoute); 
router.use('/users', usersRoute);

// Rota padrão para /api
router.get('/', (req, res) => {
  res.json({ message: 'Bem-vindo à API do FCAD!' });
});

module.exports = router;
