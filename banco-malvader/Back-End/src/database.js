const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',          // <- endereço do seu MySQL
  user: 'root',               // <- usuário do MySQL
  password: 'sua_senha',      // <- coloque sua senha aqui
  database: 'banco_malvader', // <- nome do banco que você criou
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
