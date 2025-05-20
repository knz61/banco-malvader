const express = require('express');
const router = express.Router();
const funcionarioController = require('../controllers/funcionarioController');

// Cadastro de funcionário (requer gerente)
router.post('/cadastrar', funcionarioController.cadastrarFuncionario);

module.exports = router;
