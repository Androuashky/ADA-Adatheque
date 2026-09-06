import ListeFilms from './ListeFilms.jsx'
import ListeGenre from './ListeGenre.jsx'
import {useState} from 'react'
import SearchBar from './SearchBar.jsx'
import FormulaireFilm from './Formulaire.jsx'

import './App.css'

// App ne fait qu'assembler la page.
// C'est ListeFilms qui s'occupe des films.

function App() {
  const [genreChoisi, setGenreChoisi] = useState("")
  const [genres, setGenres] = useState([])
  const [rafraichir, setRafraichir] = useState(0)

  return (
    <div>
      <h1>Adathèque</h1>
      <ListeGenre
        genres={genres}
        setGenres={setGenres}
        genreChoisi= {genreChoisi}
        setGenreChoisi= {setGenreChoisi}
      />

      <FormulaireFilm 
      genres={genres} 
      onFilmAjoute={() => setRafraichir(r => r + 1)} 
      /> 
      <ListeFilms 
       genreChoisi={genreChoisi}
       rafraichir={rafraichir}
       />
    </div>
  )
}

export default App