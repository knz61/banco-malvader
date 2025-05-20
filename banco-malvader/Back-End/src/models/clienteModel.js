const db = require('../database');

exports.criarUsuario = async ({ nome, cpf, data_nascimento, telefone, senha_hash }) => {
  const [result] = await db.query(
    'INSERT INTO usuario (nome, cpf, data_nascimento, telefone, tipo_usuario, senha_hash) VALUES (?, ?, ?, ?, "CLIENTE", ?)',
    [nome, cpf, data_nascimento, telefone, senha_hash]
  );
  return result.insertId;
};

exports.criarEndereco = async ({ id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento }) => {
  await db.query(
    'INSERT INTO endereco (id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento]
  );
};

exports.criarCliente = async (id_usuario) => {
  await db.query('INSERT INTO cliente (id_usuario) VALUES (?)', [id_usuario]);
};

exports.gerarNumeroConta = async () => {
  const numeroBase = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  const digito = (numeroBase.split('').reduce((acc, n, i) => acc + (parseInt(n) * (10 - i)), 0)) % 11;
  return `${numeroBase}-${digito}`;
};

exports.criarConta = async ({ numeroConta, id_cliente, tipo_conta, id_agencia }) => {
  const [res] = await db.query(
    'INSERT INTO conta (numero_conta, id_agencia, tipo_conta, id_cliente) VALUES (?, ?, ?, ?)',
    [numeroConta, id_agencia, tipo_conta, id_cliente]
  );
  return res.insertId;
};

exports.criarContaPoupanca = async (id_conta, taxa_rendimento) => {
  await db.query(
    'INSERT INTO conta_poupanca (id_conta, taxa_rendimento) VALUES (?, ?)',
    [id_conta, taxa_rendimento]
  );
};

exports.criarContaCorrente = async (id_conta, limite, data_vencimento, taxa_manutencao) => {
  await db.query(
    'INSERT INTO conta_corrente (id_conta, limite, data_vencimento, taxa_manutencao) VALUES (?, ?, ?, ?)',
    [id_conta, limite, data_vencimento, taxa_manutencao]
  );
};

exports.criarContaInvestimento = async (id_conta, perfil_risco, valor_minimo, taxa_rendimento_base) => {
  await db.query(
    'INSERT INTO conta_investimento (id_conta, perfil_risco, valor_minimo, taxa_rendimento_base) VALUES (?, ?, ?, ?)',
    [id_conta, perfil_risco, valor_minimo, taxa_rendimento_base]
  );
};
