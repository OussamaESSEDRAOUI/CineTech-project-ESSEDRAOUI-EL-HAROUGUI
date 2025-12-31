/* =========================================
   GESTION DES RÉALISATEURS – CineTech
   ========================================= */

let directors = JSON.parse(localStorage.getItem("directors")) || [];

const directorForm = document.getElementById("directorForm");
const directorList = document.getElementById("directorList");
const directorSearch = document.getElementById("directorSearch");
const directorNotFound = document.getElementById("directorNotFound");

const directorEditIndex = document.getElementById("directorEditIndex");

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
/* AFFICHAGE */
/* ============================= */
function displayDirectors(list = directors) {
  directorList.innerHTML = "";

  if (list.length === 0) {
    directorNotFound.classList.remove("hidden");
    return;
  }

  directorNotFound.classList.add("hidden");

  list.forEach((director, index) => {
    directorList.innerHTML += `
      <li>
        <span onclick="showFilmsByDirector('${director}')">${director}</span>
        <div>
          <button onclick="editDirector(${index})">✏️</button>
          <button onclick="confirmDeleteDirector(${index})">❌</button>
        </div>
      </li>
    `;
  });

  updateDirectorSelect();
  updateDashboard();
}

/* ============================= */
/* AJOUT / MODIFICATION */
/* ============================= */
directorForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("directorName").value.trim();
  const index = directorEditIndex.value;

  if (!name) return;

  if (index === "") {
    if (directors.includes(name)) {
      showPopup("Ce réalisateur existe déjà.");
      return;
    }
    directors.push(name);
  } else {
    const oldName = directors[index];
    directors[index] = name;

    // Mettre à jour les films liés
    films.forEach(f => {
      if (f.director === oldName) f.director = name;
    });

    directorEditIndex.value = "";
  }

  localStorage.setItem("directors", JSON.stringify(directors));
  localStorage.setItem("films", JSON.stringify(films));

  directorForm.reset();
  displayDirectors();
});

/* ============================= */
/* ÉDITION */
/* ============================= */
function editDirector(index) {
  document.getElementById("directorName").value = directors[index];
  directorEditIndex.value = index;
  showSection("directors");
}

/* ============================= */
/* SUPPRESSION */
/* ============================= */
function confirmDeleteDirector(index) {
  showPopup("Supprimer ce réalisateur ?", true, confirmed => {
    if (confirmed) {
      const name = directors[index];

      // Supprimer lien dans films
      films.forEach(f => {
        if (f.director === name) f.director = "";
      });

      directors.splice(index, 1);
      localStorage.setItem("directors", JSON.stringify(directors));
      localStorage.setItem("films", JSON.stringify(films));

      displayDirectors();
      displayFilms();
    }
  });
}

/* ============================= */
/* RECHERCHE */
/* ============================= */
directorSearch.addEventListener("input", () => {
  const value = directorSearch.value.toLowerCase();
  const filtered = directors.filter(d =>
    d.toLowerCase().includes(value)
  );
  displayDirectors(filtered);
});

/* ============================= */
/* FILMS PAR RÉALISATEUR */
/* ============================= */
function showFilmsByDirector(name) {
  const related = films.filter(f => f.director === name);
  showSection("films");
  displayFilms(related);
}

/* ============================= */
/* INIT */
/* ============================= */
displayDirectors();
