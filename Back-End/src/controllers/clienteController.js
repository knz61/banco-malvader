const clienteModel = require('../models/clienteModel');
const crypto = require('crypto');

exports.cadastrarCliente = async (req, res) => {
  try {
    const {
      nome, cpf, data_nascimento, telefone, senha, cep, local, numero_casa,
      bairro, cidade, estado, complemento
    } = req.body;

    const senha_hash = crypto.createHash('md5').update(senha).digest('hex');
    const id_usuario = await clienteModel.criarUsuario({
      nome, cpf, data_nascimento, telefone, senha_hash
    });

    await clienteModel.criarEndereco({
      id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento
    });

    await clienteModel.criarCliente(id_usuario);

    res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar cliente.' });
  }
};

exports.abrirConta = async (req, res) => {
  try {
    const { id_cliente, tipo_conta, id_agencia } = req.body;

    const numeroConta = await clienteModel.gerarNumeroConta();
    const id_conta = await clienteModel.criarConta({
      numeroConta, id_cliente, tipo_conta, id_agencia
    });

    // Criar tipo de conta específico
    if (tipo_conta === 'POUPANCA') {
      await clienteModel.criarContaPoupanca(id_conta, 0.5);
    } else if (tipo_conta === 'CORRENTE') {
      await clienteModel.criarContaCorrente(id_conta, 500, '2025-12-31', 12.90);
    } else if (tipo_conta === 'INVESTIMENTO') {
      await clienteModel.criarContaInvestimento(id_conta, 'MEDIO', 1000, 1.2);
    }

    res.status(201).json({ mensagem: 'Conta aberta com sucesso!', numeroConta });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao abrir conta.' });
  }
};
