-- Active: 1788165115430@@127.0.0.1@5451@adatheque_db
-- seed.sql

-- =========================
-- GENRES
-- =========================

INSERT INTO genre (libellé) VALUES
('Action'),
('Comédie'),
('Drame'),
('Science-fiction'),
('Animation'),
('Fantastique');


-- =========================
-- FILMS
-- =========================

INSERT INTO film (titre, année, durée_en_minutes, support, disponibilité, genre_id) VALUES
('Mad Max: Fury Road', 2015, 120, 'bluray', TRUE, 1),
('Die Hard', 1988, 132, 'dvd', TRUE, 1),
('The Grand Budapest Hotel', 2014, 100, 'bluray', TRUE, 2),
('Intouchables', 2011, 112, 'dvd', FALSE, 2),
('Forrest Gump', 1994, 142, 'dvd', TRUE, 3),
('Parasite', 2019, 132, 'bluray', FALSE, 3),
('Interstellar', 2014, 169, 'bluray', TRUE, 4),
('The Matrix', 1999, 136, 'numerique', TRUE, 4),
('Le Voyage de Chihiro', 2001, 125, 'bluray', TRUE, 5),
('Le Roi Lion', 1994, 88, 'dvd', FALSE, 5),
('Le Seigneur des Anneaux : La Communauté de l’Anneau', 2001, 178, 'bluray', TRUE, 6),
('Harry Potter à l’école des sorciers', 2001, 152, 'numerique', TRUE, 6);