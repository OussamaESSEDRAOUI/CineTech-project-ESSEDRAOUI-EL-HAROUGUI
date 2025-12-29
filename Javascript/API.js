/* =========================================
   API OMDB
   Récupération automatique des affiches
   ========================================= */

/*
  Cette fonction est appelée depuis Films.js
  après l’ajout d’un film
*/
function fetchPoster(title, index) {
  if (!title) return;

  fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=564727fa`)
    .then(response => response.json())
    .then(data => {
      if (data && data.Poster && data.Poster !== "N/A") {
        films[index].poster = data.Poster;
        localStorage.setItem("films", JSON.stringify(films));
        displayFilms();
      }
    })
    .catch(err => {
      console.error("Erreur API OMDB :", err);
    });
}
