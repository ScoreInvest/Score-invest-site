var ambiente_processo = 'producao';

var path = require("path");
var express = require("express");
var cors = require("cors");

var caminho_env = ambiente_processo === 'producao'
    ? '.env'
    : '.env.dev';

var resultadoEnv = require("dotenv").config({
    path: path.join(__dirname, caminho_env)
});

if (resultadoEnv.error) {
    throw resultadoEnv.error;
}

var PORTA_APP = Number(process.env.APP_PORT);
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######

    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :.

    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:.

    \tSe .:desenvolvimento:. você está se conectando ao banco local.
    \tSe .:producao:. você está se conectando ao banco remoto.

    \t\tPara alterar o ambiente, altere a variável 'ambiente_processo' no arquivo 'app.js'.
    `);
});