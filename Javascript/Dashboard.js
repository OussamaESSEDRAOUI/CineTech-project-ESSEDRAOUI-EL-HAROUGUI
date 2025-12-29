/* =========================================
   DASHBOARD DYNAMIQUE – CineTech
   ========================================= */

let chartInstance = null;

/* ============================= */
/* MISE À JOUR DASHBOARD */
/* ============================= */
function updateDashboard() {
  // Sécurité : éviter erreurs si sections non encore chargées
  if (!document.getElementById("totalFilms")) return;

  document.getElementById("totalFilms").textContent = films.length;
  document.getElementById("totalDirectors").textContent = directors.length;

  const ctx = document.getElementById("filmsChart");
  if (!ctx) return;

  // Détruire l'ancien graphique
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: films.map(f => f.title),
      datasets: [{
        label: "Année de sortie",
        data: films.map(f => f.year),
        backgroundColor: "#9b6bff"
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

/* ============================= */
/* INIT */
/* ============================= */
updateDashboard();
