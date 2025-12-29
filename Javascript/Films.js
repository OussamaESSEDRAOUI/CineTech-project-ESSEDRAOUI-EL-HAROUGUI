/* =========================================
   GESTION DES FILMS
   ========================================= */

let films = JSON.parse(localStorage.getItem("films")) || [];

const filmForm = document.getElementById("filmForm");
const filmList = document.getElementById("filmList");
const filmSearch = document.getElementById("filmSearch");
const filmSort = document.getElementById("filmSort");

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

  list.forEach((film, index) => {
    filmList.innerHTML += `
      <div class="film-card">
        <img src="${film.poster || 'https://via.placeholder.com/220x260'}">
        <h3>${film.title}</h3>
        <p>${film.year}</p>
        <p>${film.genre || ""}</p>
        <button onclick="editFilm(${index})">✏️</button>
        <button onclick="confirmDeleteFilm(${index})">🗑️</button>
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

  const title = document.getElementById("title").value.trim();
  const year = document.getElementById("year").value;
  const genre = document.getElementById("genre").value;
  const editIndex = document.getElementById("editIndex").value;

  if (!title || !year) return;

  if (editIndex === "") {
    films.push({ title, year, genre });
    fetchPoster(title, films.length - 1);
  } else {
    films[editIndex] = { ...films[editIndex], title, year, genre };
  }

  localStorage.setItem("films", JSON.stringify(films));
  filmForm.reset();
  document.getElementById("editIndex").value = "";
  displayFilms();
});

/* ============================= */
/* EDIT */
/* ============================= */
function editFilm(index) {
  document.getElementById("title").value = films[index].title;
  document.getElementById("year").value = films[index].year;
  document.getElementById("genre").value = films[index].genre || "";
  document.getElementById("editIndex").value = index;
}

/* ============================= */
/* DELETE AVEC CONFIRMATION */
/* ============================= */
function confirmDeleteFilm(index) {
  showPopup("Confirmer la suppression du film ?", true, confirmed => {
    if (confirmed) {
      films.splice(index, 1);
      localStorage.setItem("films", JSON.stringify(films));
      displayFilms();
    }
  });
}

/* ============================= */
/* RECHERCHE FILMS */
/* ============================= */
filmSearch.addEventListener("input", () => {
  const value = filmSearch.value.toLowerCase();
  const filtered = films.filter(f =>
    f.title.toLowerCase().includes(value)
  );
  displayFilms(filtered);
});

/* ============================= */
/* TRI FILMS */
/* ============================= */
filmSort.addEventListener("change", () => {
  let sorted = [...films];

  if (filmSort.value === "az") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (filmSort.value === "year") {
    sorted.sort((a, b) => a.year - b.year);
  }

  displayFilms(sorted);
});

/* ============================= */
/* RECHERCHE GLOBALE */
/* ============================= */
document.getElementById("globalSearch").addEventListener("input", e => {
  const value = e.target.value.toLowerCase();
  const filtered = films.filter(f =>
    f.title.toLowerCase().includes(value)
  );
  displayFilms(filtered);
});

/* ============================= */
/* INIT */
/* ============================= */
displayFilms();
