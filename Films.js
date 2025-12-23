let films = JSON.parse(localStorage.getItem("films")) || [];

const filmForm = document.getElementById("filmForm");
const filmList = document.getElementById("filmList");
const title = document.getElementById("title");
const year = document.getElementById("year");
const genre = document.getElementById("genre");

filmForm.addEventListener("submit", function (e) {
  e.preventDefault();


const film = {
  id: Date.now(),
  title: title.value,
  year: year.value,
  genre: genre.value,
  poster: "Images/poster-placeholder.jpg"
};


  films.push(film);
  localStorage.setItem("films", JSON.stringify(films));
  displayFilms();
  filmForm.reset();
});

function displayFilms() {
  filmList.innerHTML = "";

 films.forEach(f => {
  filmList.innerHTML += `
    <div class="film-card">
      <img src="${f.poster || 'Images/poster-placeholder.jpg'}" alt="${f.title}">
      <h3>${f.title}</h3>
      <p>${f.year} • ${f.genre}</p>
      <button onclick="deleteFilm(${f.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
});


  updateDashboard();
}


function deleteFilm(id) {
  if (confirm("Supprimer ce film ?")) {
    films = films.filter(f => f.id !== id);
    localStorage.setItem("films", JSON.stringify(films));
    displayFilms();
  }
}

displayFilms();
