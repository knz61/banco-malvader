const db = require('../database');

exports.buscarFuncionarioPorId = async (id_funcionario) => {
  const [rows] = await db.query('SELECT * FROM funcionario WHERE id_funcionario = ?', [id_funcionario]);
  return rows[0];
};

exports.criarUsuario = async ({ nome, cpf, data_nascimento, telefone, senha_hash }) => {
  const [res] = await db.query(
    'INSERT INTO usuario (nome, cpf, data_nascimento, telefone, tipo_usuario, senha_hash) VALUES (?, ?, ?, ?, "FUNCIONARIO", ?)',
    [nome, cpf, data_nascimento, telefone, senha_hash]
  );
  return res.insertId;
};

exports.criarEndereco = async ({ id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento }) => {
  await db.query(
    'INSERT INTO endereco (id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento]
  );
};

exports.gerarCodigoFuncionario = async () => {
  const rand = Math.floor(100000 + Math.random() * 900000);
  const codigo = `FUNC${rand}`;
  return codigo;
};

exports.criarFuncionario = async ({ id_usuario, codigo_funcionario, cargo, id_supervisor }) => {
  await db.query(
    'INSERT INTO funcionario (id_usuario, codigo_funcionario, cargo, id_supervisor) VALUES (?, ?, ?, ?)',
    [id_usuario, codigo_funcionario, cargo, id_supervisor]
  );
};
