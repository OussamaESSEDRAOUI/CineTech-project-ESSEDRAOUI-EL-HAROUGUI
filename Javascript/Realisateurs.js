/* =========================================
   GESTION DES RÉALISATEURS – CineTech
   ========================================= */

let directors = JSON.parse(localStorage.getItem("directors")) || [];

const directorForm = document.getElementById("directorForm");
const directorList = document.getElementById("directorList");
const directorSearch = document.getElementById("directorSearch");

/* ============================= */
/* POPUP UTILITAIRE (réutilise celui du site) */
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

  list.forEach((director, index) => {
    directorList.innerHTML += `
      <li>
        ${director}
        <button onclick="confirmDeleteDirector(${index})">❌</button>
      </li>
    `;
  });

  updateDashboard();
}

/* ============================= */
/* AJOUT */
/* ============================= */
directorForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("directorName").value.trim();
  if (!name) return;

  if (directors.includes(name)) {
    showPopup("Ce réalisateur existe déjà.");
    return;
  }

  directors.push(name);
  localStorage.setItem("directors", JSON.stringify(directors));
  directorForm.reset();
  displayDirectors();
});

/* ============================= */
/* SUPPRESSION */
/* ============================= */
function confirmDeleteDirector(index) {
  showPopup("Supprimer ce réalisateur ?", true, confirmed => {
    if (confirmed) {
      directors.splice(index, 1);
      localStorage.setItem("directors", JSON.stringify(directors));
      displayDirectors();
    }
  });
}

/* ============================= */
/* RECHERCHE LOCALE */
/* ============================= */
directorSearch.addEventListener("input", () => {
  const value = directorSearch.value.toLowerCase();
  const filtered = directors.filter(d =>
    d.toLowerCase().includes(value)
  );
  displayDirectors(filtered);
});

/* ============================= */
/* INIT */
/* ============================= */
displayDirectors();
