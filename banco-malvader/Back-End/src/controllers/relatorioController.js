const relatorioModel = require('../models/relatorioModel');

exports.extratoUltimas = async (req, res) => {
  try {
    const { numeroConta } = req.params;
    const transacoes = await relatorioModel.ultimasTransacoes(numeroConta);
    res.status(200).json(transacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao obter extrato.' });
  }
};

exports.extratoPorPeriodo = async (req, res) => {
  try {
    const { numeroConta, inicio, fim } = req.body;
    const transacoes = await relatorioModel.transacoesPorPeriodo(numeroConta, inicio, fim);
    res.status(200).json(transacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao obter extrato por período.' });
  }
};

exports.movimentacoesRecentes = async (req, res) => {
  try {
    const dados = await relatorioModel.viewMovimentacoesRecentes();
    res.status(200).json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao gerar relatório de movimentações.' });
  }
};

exports.clientesInadimplentes = async (req, res) => {
  try {
    const dados = await relatorioModel.clientesInadimplentes();
    res.status(200).json(dados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao buscar clientes inadimplentes.' });
  }
};
