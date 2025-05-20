const express = require('express');
const router = express.Router();
const operacoesController = require('../controllers/operacoesController');

// Depósito
router.post('/deposito', operacoesController.realizarDeposito);

// Saque
router.post('/saque', operacoesController.realizarSaque);

// Transferência
router.post('/transferencia', operacoesController.realizarTransferencia);

// Consulta de saldo
router.get('/saldo/:numeroConta', operacoesController.consultarSaldo);

module.exports = router;
