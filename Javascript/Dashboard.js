/* =========================================
   DASHBOARD DYNAMIQUE
   ========================================= */

let chartInstance = null;

function updateDashboard() {
  document.getElementById("totalFilms").textContent = films.length;
  document.getElementById("totalDirectors").textContent = directors.length;

  const ctx = document.getElementById("filmsChart");

  // Détruire l'ancien graphique (évite les bugs)
  if (chartInstance) {
    chartInstance.destroy();
  }

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
      responsive: true
    }
  });
}
