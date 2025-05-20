const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Criar novo cliente
router.post('/cadastrar', clienteController.cadastrarCliente);

// Abrir nova conta
router.post('/conta/abrir', clienteController.abrirConta);

module.exports = router;
