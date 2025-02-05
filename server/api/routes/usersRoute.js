const express = require('express');
const router = express.Router();

// Simulação de dados de usuários
const users = [
  { id: 1, name: 'João', email: 'joao@example.com' },
  { id: 2, name: 'Maria', email: 'maria@example.com' },
  { id: 3, name: 'Pedro', email: 'pedro@example.com' }
];

// Rota para obter a lista de usuários
router.get('/', (req, res) => {
  res.json(users);
});

// Rota para criar um novo usuário
router.post('/', (req, res) => {
  const newUser = req.body;
  users.push(newUser); // Adicionar o novo usuário à lista simulada
  res.status(201).json(newUser);
});

module.exports = router;
