import express from 'express'
import { pool } from '../db.js'

const rfilms = express.Router()

rfilms.get('/', async (req, res) => {

    const genreId = req.query.genre_id ?? null;
    const disponible = req.query.disponibilité?? null;

    const { rows } = await pool.query(`
        SELECT titre, libellé , année
        FROM film 
        JOIN genre ON genre.id = film.genre_id 
        WHERE film.genre_id = COALESCE($1::INTEGER, film.genre_id) AND disponibilité = COALESCE($2::BOOLEAN,film.disponibilité)`, 
        [genreId, disponible]
    ); 

    if (rows.length === 0) {
        res.status(404).send("erreur cet ID n'existe pas")
    }

    res.json(rows)
});

rfilms.get('/tri', async (req,res) => {
    const TRIS = {
    titre: "film.titre",
    annee: "film.année",
    duree: "film.durée_en_minutes"
    };

    const colonne = TRIS[req.query.tri] ?? "film.id";   // ← si absent ou inconnu : valeur par défaut

    const { rows } = await pool.query(
    `SELECT titre, année, durée_en_minutes FROM film ORDER BY ${colonne}`
    );
    res.json(rows)
})

rfilms.get('/stats', async (req,res)=> {
    const {rows} = await pool.query(`SELECT libellé, COUNT(*), AVG(durée_en_minutes) AS moyenne
        FROM film
        JOIN genre ON genre.id = film.genre_id
        GROUP BY genre.libellé
        ORDER BY genre.libellé DESC`);
    res.json(rows)
})


rfilms.get('/:id', async (req,res)=> {
    const idfilm = Number(req.params.id)

    const { rows} = await pool.query('SELECT * FROM film WHERE id = $1', [idfilm]);

    if (rows.length === 0) {
        res.status(404).send("erreur cet ID n'existe pas")
    }

    res.json(rows)
})

rfilms.post('/', async (req, res) => {
    const {titre, année, durée_en_minutes, support, genre_id} = req.body

    const champsManquants = [];
    if (!titre) champsManquants.push('titre');
    if (!année) champsManquants.push('année');
    if (!durée_en_minutes) champsManquants.push('durée_en_minutes');
    if (!genre_id) champsManquants.push('genre_id');

    if (champsManquants.length > 0) {
        return res.status(400).json({
            erreur: `Champ(s) manquant(s) : ${champsManquants.join(', ')}`
        })
    }

    // b. le support, s'il est fourni, doit être dans la liste blanche
    const supportsValides = ['dvd', 'bluray', 'numerique'];
    if (support !== undefined && !supportsValides.includes(support)) {
        return res.status(400).json({
            erreur: `Support invalide : "${support}". Valeurs acceptées : ${supportsValides.join(', ')}`
        })
    }

    // c. l'année doit être comprise entre 1888 et l'année prochaine
    const anneeProchaine = new Date().getFullYear() + 1;
    if (année < 1888 || année > anneeProchaine) {
        return res.status(400).json({
            erreur: `Année invalide : ${année}. Doit être comprise entre 1888 et ${anneeProchaine}`
        })
    }

    const {rows} = await pool.query('INSERT INTO film (titre, année, durée_en_minutes, support, genre_id) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [titre, année, durée_en_minutes, support, genre_id]
    )
    res.status(201).json(rows[0]);
})


export default rfilms