const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Importar rotas da API (primeiro declare!)
const authRoutes = require('./routes/authRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const funcionarioRoutes = require('./routes/funcionarioRoutes');
const operacoesRoutes = require('./routes/operacoesRoutes');
const relatorioRoutes = require('./routes/relatorioRoutes');

// Rotas principais (depois use)
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/funcionarios', funcionarioRoutes);
app.use('/api/operacoes', operacoesRoutes);
app.use('/api/relatorios', relatorioRoutes);

// Teste simples
app.get('/', (req, res) => {
  res.send('API do Banco Malvader funcionando.');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}✌😎`);
});
