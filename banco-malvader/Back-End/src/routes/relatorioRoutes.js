const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Extrato por conta (últimas 50)
router.get('/extrato/:numeroConta', relatorioController.extratoUltimas);

// Extrato por período
router.post('/extrato/periodo', relatorioController.extratoPorPeriodo);

// Relatório de movimentações (view)
router.get('/movimentacoes', relatorioController.movimentacoesRecentes);

// Clientes inadimplentes (saldo negativo)
router.get('/inadimplentes', relatorioController.clientesInadimplentes);

module.exports = router;
