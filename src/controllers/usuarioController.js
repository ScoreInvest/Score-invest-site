const usuarioModel = require("../models/usuarioModel");
const bcrypt = require("bcrypt");

async function autenticar(req, res) {
  const email = req.body.emailServer;
  const senha = req.body.senhaServer;

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      mensagem: "Informe seu e-mail."
    });
  }

  if (typeof senha !== "string" || !senha.trim()) {
    return res.status(400).json({
      mensagem: "Informe sua senha."
    });
  }

  try {
    const resultado = await usuarioModel.autenticar(email.trim());

    if (resultado.length === 0) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos."
      });
    }

    const usuario = resultado[0];
    const senhaCorreta = await bcrypt.compare(
      senha,
      usuario.password_hash
    );

    if (!senhaCorreta) {
      return res.status(401).json({
        mensagem: "E-mail ou senha inválidos."
      });
    }

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.userr_name,
      email: usuario.email,
      empresaId: usuario.fk_empresa,
      role: usuario.name_role
    });
  } catch (erro) {
    console.error("Erro ao autenticar:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao realizar o login."
    });
  }
}

async function cadastrar(req, res) {
  const nome = req.body.nomeServer;
  const email = req.body.emailServer;
  const senha = req.body.senhaServer;
  const empresa = req.body.empresaServer;

  if (typeof nome !== "string" || !nome.trim()) {
    return res.status(400).send("Informe seu nome.");
  }

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).send("Informe seu e-mail.");
  }

  if (typeof senha !== "string" || !senha.trim()) {
    return res.status(400).send("Informe sua senha.");
  }

  if (typeof empresa !== "string" || !empresa.trim()) {
    return res.status(400).send("Informe sua empresa.");
  }

  try {
    const empresas = await usuarioModel.buscarEmpresa(empresa.trim());

    if (empresas.length === 0) {
      return res.status(400).send("Empresa não encontrada!");
    }

    const fkEmpresa = empresas[0].id_enterprise;
    const senhaHash = await bcrypt.hash(senha, 10);

    const resultado = await usuarioModel.cadastrar(
      nome.trim(),
      email.trim(),
      senhaHash,
      fkEmpresa
    );

    return res.status(201).json(resultado);
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);

    return res.status(500).json({
      mensagem: "Erro interno ao realizar o cadastro."
    });
  }
}

module.exports = {
  autenticar,
  cadastrar
};