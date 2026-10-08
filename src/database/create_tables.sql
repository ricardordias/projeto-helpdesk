USE db_helpdesk;

-- SOLICITANTES
DROP TABLE IF EXISTS tb_solicitantes;

CREATE TABLE tb_solicitantes (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    setor VARCHAR(100) NOT NULL
);

-- CATEGORIAS
DROP TABLE IF EXISTS tb_categorias;

CREATE TABLE tb_categorias (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nome      VARCHAR(100) NOT NULL,
    descricao VARCHAR(255)
);

-- TECNICOS
DROP TABLE IF EXISTS tb_tecnicos;

CREATE TABLE tb_tecnicos (
    id    INT AUTO_INCREMENT PRIMARY KEY,
    nome  VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

-- USUARIOS (contas de acesso)
DROP TABLE IF EXISTS tb_usuarios;

CREATE TABLE tb_usuarios (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    nome           VARCHAR(100) NOT NULL,
    email          VARCHAR(150) NOT NULL UNIQUE,
    senha_hash     VARCHAR(255) NOT NULL,
    perfil         VARCHAR(20)  NOT NULL,     -- SOLICITANTE | TECNICO | ADMIN
    solicitante_id INT NULL UNIQUE,
    tecnico_id     INT NULL UNIQUE,
    CONSTRAINT fk_usuarios_solicitante FOREIGN KEY (solicitante_id) REFERENCES tb_solicitantes(id),
    CONSTRAINT fk_usuarios_tecnico     FOREIGN KEY (tecnico_id)     REFERENCES tb_tecnicos(id)
);

-- CHAMADOS
DROP TABLE IF EXISTS tb_chamados;

CREATE TABLE tb_chamados (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    titulo         VARCHAR(150) NOT NULL,
    descricao      TEXT         NOT NULL,
    prioridade     VARCHAR(10)  NOT NULL,   -- BAIXA | MEDIA | ALTA
    status         VARCHAR(20)  NOT NULL,   -- ABERTO | EM_ATENDIMENTO | CONCLUIDO
    solucao        TEXT         NULL,
    criado_em      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    solicitante_id INT NOT NULL,
    categoria_id   INT NOT NULL,
    tecnico_id     INT NULL,
    CONSTRAINT fk_chamados_solicitante FOREIGN KEY (solicitante_id) REFERENCES tb_solicitantes(id),
    CONSTRAINT fk_chamados_categoria   FOREIGN KEY (categoria_id)   REFERENCES tb_categorias(id),
    CONSTRAINT fk_chamados_tecnico     FOREIGN KEY (tecnico_id)     REFERENCES tb_tecnicos(id)
);