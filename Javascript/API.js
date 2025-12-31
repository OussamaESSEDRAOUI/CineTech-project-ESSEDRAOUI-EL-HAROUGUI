/* =========================================
   API OMDB – CineTech
   Récupération automatique des affiches
   ========================================= */

/*
  Appelée depuis Films.js
  → uniquement si aucun lien d’affiche n’est fourni
*/

function fetchPoster(title, index) {
  if (!title || !films[index]) return;

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=564727fa`)
    .then(response => response.json())
    .then(data => {
      if (!films[index]) return;

      // Poster
      if (data && data.Poster && data.Poster !== "N/A") {
        films[index].poster = data.Poster;
      }

      // Rating (IMDb)
      if (data && data.imdbRating && data.imdbRating !== "N/A") {
        films[index].rating = films[index].rating || data.imdbRating;
      }

      localStorage.setItem("films", JSON.stringify(films));
      displayFilms();
      updateDashboard();
    })
    .catch(err => {
      console.warn("OMDB indisponible :", err);
    });
}
