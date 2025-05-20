const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

// Rotas
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API do Banco Malvader funcionando.');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
