const db = require('../database');

exports.ultimasTransacoes = async (numeroConta) => {
  const [conta] = await db.query('SELECT id_conta FROM conta WHERE numero_conta = ?', [numeroConta]);
  if (!conta.length) return [];
  const id = conta[0].id_conta;

  const [rows] = await db.query(
    'SELECT * FROM transacao WHERE id_conta_origem = ? OR id_conta_destino = ? ORDER BY data_hora DESC LIMIT 50',
    [id, id]
  );
  return rows;
};

exports.transacoesPorPeriodo = async (numeroConta, inicio, fim) => {
  const [conta] = await db.query('SELECT id_conta FROM conta WHERE numero_conta = ?', [numeroConta]);
  if (!conta.length) return [];
  const id = conta[0].id_conta;

  const [rows] = await db.query(
    'SELECT * FROM transacao WHERE (id_conta_origem = ? OR id_conta_destino = ?) AND data_hora BETWEEN ? AND ? ORDER BY data_hora DESC',
    [id, id, inicio, fim]
  );
  return rows;
};

exports.viewMovimentacoesRecentes = async () => {
  const [rows] = await db.query('SELECT * FROM vw_movimentacoes_recentes');
  return rows;
};

exports.clientesInadimplentes = async () => {
  const [rows] = await db.query(`
    SELECT u.nome, u.cpf, c.numero_conta, c.saldo
    FROM conta c
    JOIN cliente cl ON c.id_cliente = cl.id_cliente
    JOIN usuario u ON cl.id_usuario = u.id_usuario
    WHERE c.saldo < 0
  `);
  return rows;
};
