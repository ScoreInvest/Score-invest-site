let database = require("../database/config")
let bcrypt = require("bcrypt");


function buscarEmpresa(nomeEmpresa){
    console.log("Empresa recebida no model: ", nomeEmpresa);

    let instrucaoSql = `
        SELECT id_enterprise
        FROM enterprise
        WHERE name = '${nomeEmpresa}';`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



// Coloque os mesmos parâmetros aqui. Vá para a let instrucaoSql
function cadastrar(nome, email, senhaHash, fkEmpresa) {

    let instrucaoSql = `
        INSERT INTO userr (
            userr_name,
            password_hash,
            email,
            fk_empresa,
            fk_role
        )
        VALUES (
            '${nome}',
            '${senhaHash}',
            '${email}',
            ${fkEmpresa},
            (
                SELECT id_role
                FROM role
                WHERE name_role = 'CONSULTOR'
            )
        );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}

function autenticar(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email)
    let instrucaoSql = `
       SELECT 
        u.userr_name,
        u.email,
        u.password_hash,
        e.name AS Empresa, 
        r.name_role AS Função
       FROM userr u 
       JOIN enterprise e 
	    ON u.fk_empresa = e.id_enterprise
       JOIN role r
	    ON u.fk_role = r.id_role
       WHERE u.email = '${email}'
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarEmpresa
};