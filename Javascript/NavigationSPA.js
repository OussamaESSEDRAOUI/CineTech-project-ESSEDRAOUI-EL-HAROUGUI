/* =========================================
   NAVIGATION SPA – CineTech
   ========================================= */

/* ============================= */
/* AFFICHER UNE SECTION */
/* ============================= */
function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(id);
  if (target) target.classList.add("active");

  if (id === "dashboard") updateDashboard();
}

/* ============================= */
/* THÈME SOMBRE / CLAIR */
/* ============================= */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* ============================= */
/* SIDEBAR */
/* ============================= */
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

/* ============================= */
/* RECHERCHE GLOBALE */
/* ============================= */
const globalSearch = document.getElementById("globalSearch");

globalSearch.addEventListener("input", e => {
  const value = e.target.value.toLowerCase().trim();

  if (value === "") {
    displayFilms();
    displayDirectors();
    return;
  }

  const filmResults = films.filter(f =>
    f.title.toLowerCase().includes(value)
  );

  const directorResults = directors.filter(d =>
    d.toLowerCase().includes(value)
  );

  if (filmResults.length > 0) {
    showSection("films");
    displayFilms(filmResults);
  }
  else if (directorResults.length > 0) {
    showSection("directors");
    displayDirectors(directorResults);
  }
  else {
    showSection("films");
    displayFilms([]);
  }
});
