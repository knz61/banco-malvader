const operacoesModel = require('../models/operacoesModel');

exports.realizarDeposito = async (req, res) => {
  const { numeroConta, valor, descricao } = req.body;
  try {
    const conta = await operacoesModel.buscarContaPorNumero(numeroConta);
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada.' });

    await operacoesModel.registrarTransacao({
      id_conta_origem: conta.id_conta,
      tipo_transacao: 'DEPOSITO',
      valor,
      descricao
    });

    res.status(200).json({ mensagem: 'Depósito realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao realizar depósito.' });
  }
};

exports.realizarSaque = async (req, res) => {
  const { numeroConta, valor, descricao } = req.body;
  try {
    const conta = await operacoesModel.buscarContaPorNumero(numeroConta);
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada.' });

    if (conta.saldo < valor) {
      return res.status(400).json({ mensagem: 'Saldo insuficiente.' });
    }

    await operacoesModel.registrarTransacao({
      id_conta_origem: conta.id_conta,
      tipo_transacao: 'SAQUE',
      valor,
      descricao
    });

    res.status(200).json({ mensagem: 'Saque realizado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao realizar saque.' });
  }
};

exports.realizarTransferencia = async (req, res) => {
  const { contaOrigem, contaDestino, valor, descricao } = req.body;
  try {
    const origem = await operacoesModel.buscarContaPorNumero(contaOrigem);
    const destino = await operacoesModel.buscarContaPorNumero(contaDestino);

    if (!origem || !destino) return res.status(404).json({ mensagem: 'Conta de origem ou destino inválida.' });
    if (origem.saldo < valor) return res.status(400).json({ mensagem: 'Saldo insuficiente.' });

    await operacoesModel.registrarTransferencia(origem.id_conta, destino.id_conta, valor, descricao);

    res.status(200).json({ mensagem: 'Transferência realizada com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao realizar transferência.' });
  }
};

exports.consultarSaldo = async (req, res) => {
  const { numeroConta } = req.params;
  try {
    const conta = await operacoesModel.buscarContaPorNumero(numeroConta);
    if (!conta) return res.status(404).json({ mensagem: 'Conta não encontrada.' });

    res.status(200).json({ saldo: conta.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao consultar saldo.' });
  }
};
