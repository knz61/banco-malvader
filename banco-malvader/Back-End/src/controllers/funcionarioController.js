const funcionarioModel = require('../models/funcionarioModel');
const crypto = require('crypto');

exports.cadastrarFuncionario = async (req, res) => {
  try {
    const {
      nome, cpf, data_nascimento, telefone, senha, cargo, id_supervisor,
      cep, local, numero_casa, bairro, cidade, estado, complemento
    } = req.body;

    // Simula verificação de permissão do supervisor (deveria vir do login autenticado)
    const supervisor = await funcionarioModel.buscarFuncionarioPorId(id_supervisor);
    if (!supervisor || supervisor.cargo !== 'GERENTE') {
      return res.status(403).json({ mensagem: 'Apenas gerentes podem cadastrar funcionários.' });
    }

    const senha_hash = crypto.createHash('md5').update(senha).digest('hex');
    const id_usuario = await funcionarioModel.criarUsuario({
      nome, cpf, data_nascimento, telefone, senha_hash
    });

    await funcionarioModel.criarEndereco({
      id_usuario, cep, local, numero_casa, bairro, cidade, estado, complemento
    });

    const codigo_funcionario = await funcionarioModel.gerarCodigoFuncionario();

    await funcionarioModel.criarFuncionario({
      id_usuario, codigo_funcionario, cargo, id_supervisor
    });

    res.status(201).json({ mensagem: 'Funcionário cadastrado com sucesso.', codigo_funcionario });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar funcionário.' });
  }
};
