/* =========================================
   NAVIGATION SPA + SIDEBAR + THÈME + RECHERCHE
   ========================================= */

/* ============================= */
/* AFFICHER UNE SECTION (SPA) */
/* ============================= */
function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  // Met à jour le dashboard si nécessaire
  if (id === "dashboard") {
    updateDashboard();
  }
}

/* ============================= */
/* TOGGLE THÈME */
/* ============================= */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* ============================= */
/* TOGGLE SIDEBAR */
/* ============================= */
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

/* ============================= */
/* RECHERCHE GLOBALE (SPA) */
/* ============================= */
const globalSearch = document.getElementById("globalSearch");

globalSearch.addEventListener("input", e => {
  const value = e.target.value.toLowerCase();

  // Recherche films
  const filteredFilms = films.filter(f =>
    f.title.toLowerCase().includes(value)
  );

  // Recherche réalisateurs
  const filteredDirectors = directors.filter(d =>
    d.toLowerCase().includes(value)
  );

  if (value !== "") {
    // Afficher films si trouvés
    if (filteredFilms.length > 0) {
      showSection("films");
      displayFilms(filteredFilms);
    }
    // Sinon afficher réalisateurs
    else if (filteredDirectors.length > 0) {
      showSection("directors");
      displayDirectors(filteredDirectors);
    }
  } else {
    // Reset affichage
    displayFilms();
    displayDirectors();
  }
});
