let usuarioModel = require("../models/usuarioModel");
let bcrypt = require("bcrypt");

function autenticar(req, res) {
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;

  usuarioModel.autenticar(email, senha).then(function (resultado) {
    if (resultado.length == 0) {
      res.status(401).json({
        mensagem: "E-mail ou senha inválido",
      });
      return;
    }

    let usuario = resultado[0];

    bcrypt.compare(senha, usuario.password_hash).then(function (senhaCorreta) {
      if (!senhaCorreta) {
        res.status(401).json({
          mensagem: "E-mail ou senha Inválidos",
        });
        return;
      }

      res.status(200).json({
        id: usuario.id,
        nome: usuario.userr_name,
        email: usuario.email,
        empresaId: usuario.fk_empresa,
        role: usuario.name_role,
      });
    });
  })
  .catch(function(err){
    console.log(err)
    res.status(500).json(err.sqlMessage)
  });
}


function cadastrar(req, res) {

  let nome = req.body.nomeServer;
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;
  let empresa = req.body.empresaServer;

  console.log("E-mail recebido:", email);
  console.log("Empresa recebida:", empresa);

  let senhaHash = bcrypt.hashSync(senha, 10);

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");

  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");

  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");

  } else if (empresa == undefined) {
    res.status(400).send("Sua empresa está undefined!");

  } else {

    usuarioModel.buscarEmpresa(empresa)
      .then(function (resultado) {

        if (resultado.length == 0) {
          res.status(400).send("Empresa não encontrada!");
          return;
        }

        let fkEmpresa = resultado[0].id_enterprise;

        usuarioModel
          .cadastrar(nome, email, senhaHash, fkEmpresa)
          .then(function (resultado) {
            res.status(201).json(resultado);
          })
          .catch(function (erro) {
            console.log(erro);
            console.log(
              "\nHouve um erro ao realizar o cadastro! Erro: ",
              erro.sqlMessage,
            );
            res.status(500).json(erro.sqlMessage);
          });

      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}


module.exports = {
  autenticar,
  cadastrar,
};