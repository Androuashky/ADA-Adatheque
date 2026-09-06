-- Active: 1788248957497@@127.0.0.1@5451@adatheque_db

CREATE TYPE supp AS enum ('dvd', 'bluray', 'numerique');

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    libellé VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(150) NOT NULL,
    année INTEGER NOT NULL,
    durée_en_minutes INTEGER NOT NULL,
    support supp NOT NULL DEFAULT 'dvd',
    disponibilité BOOLEAN DEFAULT TRUE,
    genre_id INTEGER NOT NULL REFERENCES genre(id)
)