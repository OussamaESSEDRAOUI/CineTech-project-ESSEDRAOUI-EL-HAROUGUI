/* =========================================
   GESTION DES FILMS (CRUD COMPLET)
   ========================================= */

// Récupération depuis le localStorage
let films = JSON.parse(localStorage.getItem("films")) || [];

// Éléments HTML
const filmForm = document.getElementById("filmForm");
const filmList = document.getElementById("filmList");
const editIndexInput = document.getElementById("editIndex");

/*
  Afficher tous les films
*/
function displayFilms(filter = "") {
  filmList.innerHTML = "";

  films
    .filter(f =>
      f.title.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((film, index) => {
      filmList.innerHTML += `
        <div class="film-card">
          <img src="${film.poster || 'https://via.placeholder.com/300x450'}">
          <h3>${film.title}</h3>
          <p>${film.year} • ${film.genre}</p>

          <button onclick="editFilm(${index})">✏️</button>
          <button onclick="confirmDeleteFilm(${index})">🗑️</button>
        </div>
      `;
    });

  updateDashboard();
}

/*
  Ajouter ou modifier un film
*/
filmForm.addEventListener("submit", e => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const year = document.getElementById("year").value;
  const genre = document.getElementById("genre").value;
  const editIndex = editIndexInput.value;

  if (editIndex === "") {
    // AJOUT
    const film = { title, year, genre, poster: "" };
    films.push(film);
    fetchPoster(title, films.length - 1);
  } else {
    // MODIFICATION
    films[editIndex].title = title;
    films[editIndex].year = year;
    films[editIndex].genre = genre;
    editIndexInput.value = "";
  }

  localStorage.setItem("films", JSON.stringify(films));
  filmForm.reset();
  displayFilms();
});

/*
  Pré-remplir le formulaire pour modifier
*/
function editFilm(index) {
  const film = films[index];

  document.getElementById("title").value = film.title;
  document.getElementById("year").value = film.year;
  document.getElementById("genre").value = film.genre;
  editIndexInput.value = index;
}

/*
  Confirmation intégrée (pas alert brutal)
*/
function confirmDeleteFilm(index) {
  if (confirm(`Supprimer le film "${films[index].title}" ?`)) {
    films.splice(index, 1);
    localStorage.setItem("films", JSON.stringify(films));
    displayFilms();
  }
}

/*
  Recherche globale (films + réalisateurs)
*/
const globalSearch = document.getElementById("globalSearch");

globalSearch.addEventListener("input", e => {
  displayFilms(e.target.value);
});

// Initialisation
displayFilms();
