/* =========================================
   GESTION DES RÉALISATEURS
   ========================================= */

let directors = JSON.parse(localStorage.getItem("directors")) || [];

const directorForm = document.getElementById("directorForm");
const directorList = document.getElementById("directorList");

/*
  Affichage
*/
function displayDirectors() {
  directorList.innerHTML = "";

  directors.forEach((director, index) => {
    directorList.innerHTML += `
      <li>
        ${director}
        <button onclick="removeDirector(${index})">❌</button>
      </li>
    `;
  });

  updateDashboard();
}

/*
  Ajouter
*/
directorForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("directorName").value;
  directors.push(name);

  localStorage.setItem("directors", JSON.stringify(directors));
  directorForm.reset();
  displayDirectors();
});

/*
  Supprimer
*/
function removeDirector(index) {
  directors.splice(index, 1);
  localStorage.setItem("directors", JSON.stringify(directors));
  displayDirectors();
}

// Initialisation
displayDirectors();
