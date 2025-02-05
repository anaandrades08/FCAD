//server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000; // Certifique-se de que a porta está configurada corretamente

// Middleware
app.use(cors());
app.use(express.json());

// Importar e registrar o roteador principal da API
const apiRouter = require('./api/index.js');
app.use('/api', apiRouter); // Registrar o roteador principal da API

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
