import { useState, useEffect } from 'react'
import './ListeFilms.css'
import SearchBar from './SearchBar'

// Le composant qui va chercher les films et les affiche.
// C'est l'équivalent de tout le <script> de la version DOM.

function ListeFilms({ genreChoisi, rafraichir}) {
  // le tableau des films, vide au départ
  const [films, setFilms] = useState([])
  const [search, setSearch] = useState('')
  const [tri, setTri] = useState('') // 1. nouvel état pour le tri


  // useEffect avec [] : le chargement se fait une seule fois,
  // quand le composant s'affiche pour la première fois
  useEffect(() => {
    async function chargerFilms() {

        const url = genreChoisi === ""
        ? "http://localhost:3001/films"
        : `http://localhost:3001/films?genre_id=${genreChoisi}`

      const reponse = await fetch(url)
      const donnees = await reponse.json()
      setFilms(donnees)
    }
    chargerFilms()
  }, [genreChoisi, rafraichir])

  const filmsFiltres = films.filter(f =>
  f.titre.toLowerCase().includes(search.toLowerCase()) ||
  String(f.année).includes(search)
  );

  let resultat = filmsFiltres;

  if (tri === 'annee') resultat.sort((a, b) => a.année - b.année);
  if (tri === 'duree') resultat.sort((a, b) => a.duree - b.duree);
  if (tri === 'titre') resultat.sort((a, b) => a.titre.localeCompare(b.titre));

  return (
    <>
    <SearchBar search={search} setSearch={setSearch}/>


    <select className='tri'value={tri} onChange={(e) => setTri(e.target.value)}>
        <option value="">Trier par...</option>
        <option value="annee">Année</option>
        <option value="duree">Durée</option>
        <option value="titre">Titre</option>
    </select>


    <ul className="carte" >
      {filmsFiltres.map(film => (
        <li key={film.id}>
          {film.titre} — {film.libellé} — {film.année}
        </li>
      ))}
    </ul>
    </>
  )}

  export default ListeFilms
