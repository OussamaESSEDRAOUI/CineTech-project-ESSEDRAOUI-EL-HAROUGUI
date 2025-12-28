/* =========================================
   Navigation SPA + Sidebar + Thème
   ========================================= */

/*
  Cette fonction permet d'afficher
  une seule section à la fois (SPA)
*/
function showSection(id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}

/*
  Mode sombre / clair
*/
function toggleTheme() {
  document.body.classList.toggle("light");
}

/*
  Bouton afficher / cacher la sidebar
*/
const toggleSidebarBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleSidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
