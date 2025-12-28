/* =========================================
   API OMDB – Récupération des affiches
   ========================================= */

function fetchPoster(title, index) {
  fetch(`https://www.omdbapi.com/?t=${title}&apikey=564727fa`)
    .then(res => res.json())
    .then(data => {
      if (data.Poster && data.Poster !== "N/A") {
        films[index].poster = data.Poster;
        localStorage.setItem("films", JSON.stringify(films));
        displayFilms();
      }
    })
    .catch(error => {
      console.log("Erreur API OMDB :", error);
    });
}
