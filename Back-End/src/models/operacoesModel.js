const db = require('../database');

exports.buscarContaPorNumero = async (numeroConta) => {
  const [rows] = await db.query('SELECT * FROM conta WHERE numero_conta = ?', [numeroConta]);
  return rows[0];
};

exports.registrarTransacao = async ({ id_conta_origem, tipo_transacao, valor, descricao }) => {
  await db.query(
    'INSERT INTO transacao (id_conta_origem, tipo_transacao, valor, descricao) VALUES (?, ?, ?, ?)',
    [id_conta_origem, tipo_transacao, valor, descricao]
  );
};

exports.registrarTransferencia = async (id_conta_origem, id_conta_destino, valor, descricao) => {
  await db.query(
    'INSERT INTO transacao (id_conta_origem, id_conta_destino, tipo_transacao, valor, descricao) VALUES (?, ?, "TRANSFERENCIA", ?, ?)',
    [id_conta_origem, id_conta_destino, valor, descricao]
  );
};
