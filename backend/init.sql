CREATE DATABASE IF NOT EXISTS registro_elettronico;
USE registro_elettronico;

CREATE TABLE IF NOT EXISTS voti (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studente_username VARCHAR(255) NOT NULL,
    studente_nome VARCHAR(255) NOT NULL,
    materia VARCHAR(255) NOT NULL,
    voto DECIMAL(4,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO voti (studente_username, studente_nome, materia, voto)
VALUES
    ('studente1', 'Mario Rossi', 'Matematica', 8),
    ('studente1', 'Mario Rossi', 'Storia', 7.5),
    ('studente2', 'Giulia Bianchi', 'Inglese', 9);
