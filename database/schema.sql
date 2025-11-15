-- database/schema.sql
CREATE DATABASE IF NOT EXISTS studio_tatuagem_inkspirar;
USE studio_tatuagem_inkspirar;

-- Tatuadores (deve vir antes de usuarios)
CREATE TABLE IF NOT EXISTS tatuadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  data_nascimento DATE NOT NULL,
  data_admissao DATE,
  email VARCHAR(150) UNIQUE NOT NULL,
  especialidades VARCHAR(255),
  celular VARCHAR(30),
  instagram VARCHAR(100),
  cpf VARCHAR(20) UNIQUE NOT NULL,
  ativo TINYINT(1) DEFAULT 1,
  disponibilidade JSON,
  valor_hora DECIMAL(10,2),
  data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo ENUM('admin','tatuador') NOT NULL DEFAULT 'tatuador',
  tatuador_id INT NULL,
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  primeiro_acesso TINYINT(1) NOT NULL DEFAULT 0,
  data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
  ultimo_login DATETIME NULL,
  FOREIGN KEY (tatuador_id) REFERENCES tatuadores(id) ON DELETE SET NULL
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  data_nascimento DATE NOT NULL,
  celular VARCHAR(30) NOT NULL,
  cpf VARCHAR(20) UNIQUE NOT NULL,
  instagram VARCHAR(100),
  status ENUM('ativo','inativo') NOT NULL DEFAULT 'ativo',
  data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data_agendamento DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  tatuador_id INT NOT NULL,
  cliente_id INT NOT NULL,
  ideia TEXT,
  valor DECIMAL(10,2),
  status ENUM('aguardando','cancelada','realizada') DEFAULT 'aguardando',
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tatuador_id) REFERENCES tatuadores(id),
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);

-- Servicos
CREATE TABLE IF NOT EXISTS servicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  duracao_min INT,
  preco DECIMAL(10,2)
);

-- Seed admin (senha admin123 hash)
INSERT INTO usuarios (nome,email,senha,tipo,ativo,primeiro_acesso,data_cadastro)
VALUES ('Administrador','admin@studio.com','$2a$10$u1Jq/QqKf1u1xJd9qAq1kuu8dQm1uKQeLW8g8m7A6KqLkC/e8p5yG','admin',1,0,NOW())
ON DUPLICATE KEY UPDATE email=email;
