const film = document.getElementById('liste')
const etat = document.getElementById('etat')
const genre = document.getElementById('genre')
const compte = document.getElementById('compteur')
const search = document.getElementById('search')
const API = 'http://localhost:3001';

async function data (route) {

    etat.textContent = "Chargement ..."

    try {
        const response = await fetch(API + route)
        const data = await response.json();
        return data;
    } catch(erreur) {
        etat.textContent = "Serveur injoignable";
        return null;
    }
}


async function afficher (films) {
    // Si aucune liste n'est fournie, on va chercher tous les films comme avant
    const aff = films ?? await data('/films');


    if (aff.length === 0) {
        etat.textContent = "Aucun film";
        compte.textContent= "O résultat";
        return;
    }

    film.innerHTML = ""; 
    etat.textContent = "";

    aff.forEach(el => {
        const li = document.createElement("li")
        li.textContent = `${el.titre} - ${el.libellé} - ${el.année}`
        film.appendChild(li);
        
    })

    compte.textContent= `${aff.length} résultats`;

}


async function afficherGenres () {
    const g = await data('/genres');

    if (!g || g.length === 0) {
        return;
    }
   
    
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Tous les genres";
    defaultOption.value = "tous";
    genre.appendChild(defaultOption);

   
    g.forEach(el => {
        const option = document.createElement("option");
        option.value = el.libellé;
        option.textContent = el.libellé;
        genre.appendChild(option);
    });
}

async function filter () {
    const tousLesFilms = await data('/films');
    const valeurSelectionnee = genre.value;

    if (!tousLesFilms) return;

    if (valeurSelectionnee === "tous") {
        afficher(tousLesFilms)
    } else {
        const filtres = tousLesFilms.filter((el)=> el.libellé === valeurSelectionnee);
        afficher(filtres)
    }
}

genre.addEventListener("change",filter)



afficher();
afficherGenres();
