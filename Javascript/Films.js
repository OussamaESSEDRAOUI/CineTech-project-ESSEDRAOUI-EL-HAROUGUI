/* =========================================
   GESTION DES FILMS – CineTech
   ========================================= */

let films = JSON.parse(localStorage.getItem("films")) || [];

const filmForm = document.getElementById("filmForm");
const filmList = document.getElementById("filmList");
const filmSearch = document.getElementById("filmSearch");
const filmSort = document.getElementById("filmSort");
const filmNotFound = document.getElementById("filmNotFound");

const directorSelect = document.getElementById("filmDirector");

/* ============================= */
/* SYNC RÉALISATEURS → SELECT */
/* ============================= */
function updateDirectorSelect() {
  directorSelect.innerHTML = `<option value="">Réalisateur</option>`;
  directors.forEach(d => {
    directorSelect.innerHTML += `<option value="${d}">${d}</option>`;
  });
}

/* ============================= */
/* POPUP UTILITAIRE */
/* ============================= */
function showPopup(message, confirm = false, callback = null) {
  const popup = document.getElementById("popup");
  const msg = document.getElementById("popupMessage");
  const btnConfirm = document.getElementById("popupConfirm");
  const btnCancel = document.getElementById("popupCancel");

  msg.textContent = message;
  popup.classList.remove("hidden");
  btnCancel.style.display = confirm ? "inline-block" : "none";

  btnConfirm.onclick = () => {
    popup.classList.add("hidden");
    if (callback) callback(true);
  };

  btnCancel.onclick = () => {
    popup.classList.add("hidden");
    if (callback) callback(false);
  };
}

/* ============================= */
/* AFFICHAGE DES FILMS */
/* ============================= */
function displayFilms(list = films) {
  filmList.innerHTML = "";

  if (list.length === 0) {
    filmNotFound.classList.remove("hidden");
    return;
  }

  filmNotFound.classList.add("hidden");

  list.forEach((film, index) => {
    filmList.innerHTML += `
      <div class="film-card">
        <img src="${film.poster || 'https://via.placeholder.com/80x120?text=No+Image'}">
        <div>
          <h3>${film.title}</h3>
          <p>🎬 ${film.genre || "—"} | ${film.year}</p>
          <p>🎥 Réalisateur : ${film.director || "—"}</p>
          <p>⭐ Rating : ${film.rating ?? "—"}</p>
          <div class="actions">
            <button onclick="editFilm(${index})">✏️</button>
            <button onclick="confirmDeleteFilm(${index})">❌</button>
          </div>
        </div>
      </div>
    `;
  });

  updateDashboard();
}

/* ============================= */
/* AJOUT / MODIFICATION */
/* ============================= */
filmForm.addEventListener("submit", e => {
  e.preventDefault();

  const index = document.getElementById("editIndex").value;
  const title = document.getElementById("title").value.trim();
  const year = document.getElementById("year").value;
  const genre = document.getElementById("genre").value.trim();
  const director = directorSelect.value;
  const rating = document.getElementById("rating").value;
  const poster = document.getElementById("poster").value.trim();

  if (!title || !year) return;

  const filmData = {
    title,
    year,
    genre,
    director,
    rating,
    poster
  };

  if (index === "") {
    films.push(filmData);
    const newIndex = films.length - 1;

    if (!poster) fetchPoster(title, newIndex);
  } else {
    films[index] = filmData;

    if (!poster) fetchPoster(title, index);
  }

  localStorage.setItem("films", JSON.stringify(films));
  filmForm.reset();
  document.getElementById("editIndex").value = "";

  displayFilms();
});

/* ============================= */
/* ÉDITION */
/* ============================= */
function editFilm(index) {
  const film = films[index];

  document.getElementById("editIndex").value = index;
  document.getElementById("title").value = film.title;
  document.getElementById("year").value = film.year;
  document.getElementById("genre").value = film.genre;
  directorSelect.value = film.director || "";
  document.getElementById("rating").value = film.rating || "";
  document.getElementById("poster").value = film.poster || "";

  showSection("films");
}

/* ============================= */
/* SUPPRESSION */
/* ============================= */
function confirmDeleteFilm(index) {
  showPopup("Supprimer ce film ?", true, confirmed => {
    if (confirmed) {
      films.splice(index, 1);
      localStorage.setItem("films", JSON.stringify(films));
      displayFilms();
    }
  });
}

/* ============================= */
/* RECHERCHE */
/* ============================= */
filmSearch.addEventListener("input", () => {
  const value = filmSearch.value.toLowerCase();

  const filtered = films.filter(f =>
    f.title.toLowerCase().includes(value)
  );

  displayFilms(filtered);
});

/* ============================= */
/* TRI */
/* ============================= */
filmSort.addEventListener("change", () => {
  let sorted = [...films];

  switch (filmSort.value) {
    case "az":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "year":
      sorted.sort((a, b) => b.year - a.year);
      break;
    case "rating":
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
  }

  displayFilms(sorted);
});

/* ============================= */
/* INIT */
/* ============================= */
updateDirectorSelect();
displayFilms();
