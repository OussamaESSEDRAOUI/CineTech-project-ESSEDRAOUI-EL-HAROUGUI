let directors = JSON.parse(localStorage.getItem("directors")) || [];

const directorForm = document.getElementById("directorForm");
const directorList = document.getElementById("directorList");
const directorName = document.getElementById("directorName");

directorForm.addEventListener("submit", e => {
  e.preventDefault();

  directors.push(directorName.value);
  localStorage.setItem("directors", JSON.stringify(directors));
  displayDirectors();
  directorForm.reset();
});

function displayDirectors() {
  directorList.innerHTML = "";
  directors.forEach((d, i) => {
    directorList.innerHTML += `
      <li>${d} <button onclick="removeDirector(${i})">❌</button></li>
    `;
  });
  updateDashboard();
}

function removeDirector(i) {
  directors.splice(i, 1);
  localStorage.setItem("directors", JSON.stringify(directors));
  displayDirectors();
}

displayDirectors();
