function updateDashboard() {
  document.getElementById("totalFilms").textContent = films.length;
  document.getElementById("totalDirectors").textContent = directors.length;

  new Chart(document.getElementById("filmsChart"), {
    type: 'bar',
    data: {
      labels: films.map(f => f.title),
      datasets: [{
        label: "Année de sortie",
        data: films.map(f => f.year)
      }]
    }
  });
}
