import { useState } from 'react'


function FormulaireFilm({ genres,  onFilmAjoute }) {
  const [titre, setTitre] = useState('')
  const [année, setAnnée] = useState('')
  const [durée, setDurée] = useState('')
  const [support, setSupport] = useState('')
  const [genreId, setGenreId] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const nouveauFilm = {
      titre,
      année: parseInt(année),
      durée_en_minutes: parseInt(durée),
      genre_id: parseInt(genreId),
      support: support || undefined
    }

    const reponse = await fetch('http://localhost:3001/films', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nouveauFilm)
    })

    if (reponse.ok) {
      setTitre('')
      setAnnée('')
      setDurée('')
      setSupport('')
      setGenreId('')
      onFilmAjoute()
    } else {
      const erreur = await reponse.json()
      alert(erreur.erreur)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={titre}
        onChange={(e) => setTitre(e.target.value)}
      />

      <input
        type="number"
        placeholder="Année"
        value={année}
        onChange={(e) => setAnnée(e.target.value)}
      />

      <input
        type="number"
        placeholder="Durée (minutes)"
        value={durée}
        onChange={(e) => setDurée(e.target.value)}
      />

      <select value={support} onChange={(e) => setSupport(e.target.value)}>
        <option value="">Support...</option>
        <option value="dvd">DVD</option>
        <option value="bluray">Blu-ray</option>
        <option value="numerique">Numérique</option>
      </select>

      <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
        <option value="">Genre...</option>
        {genres.map(g => (
          <option key={g.id} value={g.id}>{g.libellé}</option>
        ))}
      </select>

      <button type="submit">Ajouter le film</button>
    </form>
  )
}

export default FormulaireFilm