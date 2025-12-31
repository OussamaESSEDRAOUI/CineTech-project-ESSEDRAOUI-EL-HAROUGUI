/* =========================================
   DASHBOARD DYNAMIQUE – CineTech
   ========================================= */

let chartInstance = null;

/* ============================= */
/* MISE À JOUR DASHBOARD */
/* ============================= */
function updateDashboard() {
  const totalFilmsEl = document.getElementById("totalFilms");
  const totalDirectorsEl = document.getElementById("totalDirectors");
  const canvas = document.getElementById("filmsChart");

  if (!totalFilmsEl || !totalDirectorsEl || !canvas) return;

  totalFilmsEl.textContent = films.length;
  totalDirectorsEl.textContent = directors.length;

  if (chartInstance) chartInstance.destroy();

  if (films.length === 0) return;

  const labels = films.map(f => f.title);
  const years = films.map(f => f.year);
  const ratings = films.map(f => f.rating || 0);

  chartInstance = new Chart(canvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Année de sortie",
          data: years,
          backgroundColor: "#4f8cff"
        },
        {
          label: "Rating IMDb",
          data: ratings,
          backgroundColor: "#9b6bff"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: "#999" }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#999" }
        },
        x: {
          ticks: { color: "#999" }
        }
      }
    }
  });
}

/* ============================= */
/* INIT */
/* ============================= */
updateDashboard();
