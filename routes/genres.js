import express from 'express';
import {pool} from '../db.js';

const rgenre = express.Router()

rgenre.get('/', async (req, res) => {
    const { rows } = await pool.query('SELECT libellé from genre ORDER BY libellé ASC')
    res.json(rows)
})
rgenre.get('/:id/films', async (req,res)=> {
    const idGenre = Number(req.params.id)

    const { rows } = await pool.query('SELECT * from film JOIN genre ON genre.id = film.genre_id WHERE genre.id = $1', 
        [idGenre])

    if ( rows.length === 0) {
        res.status(404).send("L'id du genre n'existe pas")
    } 

    res.json(rows)
})

export default rgenre
