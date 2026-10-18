use user_core; 

CREATE TABLE role (
	id_role INT PRIMARY KEY auto_increment,
    name_role varchar(50)
);

CREATE TABLE permissions(
	id_permission INT PRIMARY KEY auto_increment,
    name_permission VARCHAR(50)
);

CREATE TABLE role_permissions(
	id_role_fk INT,
	id_permission_fk INT,
    PRIMARY KEY(id_permission_fk, id_role_fk), 
    FOREIGN KEY(id_role_fk) REFERENCES role(id_role),
    FOREIGN KEY(id_permission_fk) REFERENCES permissions(id_permission)
);

CREATE TABLE enterprise (
	id_enterprise INT PRIMARY KEY auto_increment, 
    name VARCHAR(100), 
	cnpj VARCHAR(20),
	email VARCHAR(100)
);

CREATE TABLE userr (
	id INT PRIMARY KEY auto_increment, 
    userr_name varchar(50),
    password_hash varchar(255), 
    email VARCHAR(100), 
    fk_empresa INT, 
    fk_role INT,
    FOREIGN KEY (fk_empresa) REFERENCES enterprise(id_enterprise),
    FOREIGN KEY (fk_role) REFERENCES role(id_role)
);

DESCRIBE role;
DESCRIBE permissions;

SELECT 
	u.userr_name,
    u.email,
    e.name AS Empresa, 
    r.name_role AS Função
FROM userr u 
JOIN enterprise e 
	ON u.fk_empresa = e.id_enterprise
JOIN role r
	ON u.fk_role = r.id_role