const db = require('../database');

// Busca usuário por CPF
exports.buscarPorCPF = async (cpf) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE cpf = ?', [cpf]);
  return rows[0];
};

// Atualiza OTP no banco
exports.atualizarOtp = async (id_usuario, otp, expiracao) => {
  await db.query(
    'UPDATE usuario SET otp_ativo = ?, otp_expiracao = ? WHERE id_usuario = ?',
    [otp, expiracao, id_usuario]
  );
};

// Registra entrada na auditoria
exports.registrarAuditoria = async (id_usuario, acao, detalhes) => {
  await db.query(
    'INSERT INTO auditoria (id_usuario, acao, detalhes) VALUES (?, ?, ?)',
    [id_usuario, acao, detalhes]
  );
};
