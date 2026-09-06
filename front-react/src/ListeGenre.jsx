 import { useState, useEffect } from 'react'
 import "./ListeGenre.css"

 function ListeGenre({genres, setGenres, genreChoisi, setGenreChoisi}) {

    

  useEffect(() => {
    async function chargerGenres() {
      const reponse = await fetch("http://localhost:3001/genres")
      const donnees = await reponse.json()
      setGenres(donnees)
    }
    chargerGenres()
  }, [])

  return (
    <select value={genreChoisi} className="genre" onChange={event => setGenreChoisi(event.target.value)} >
        <option value="">Tous les genres</option>
      {genres.map(genre => (
        <option value = {genre.id} key={genre.id}>
          {genre.libellé}
        </option>
      ))}
    </select>
  )}

    export default ListeGenre