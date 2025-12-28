/* =========================================
   AUTHENTIFICATION (SIMULÉE – PROJET ACADÉMIQUE)
   ========================================= */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

/*
  Connexion
*/
loginForm.onsubmit = e => {
  e.preventDefault();
  alert("Connexion réussie (simulation académique)");
};

/*
  Inscription
*/
registerForm.onsubmit = e => {
  e.preventDefault();
  alert("Inscription réussie (simulation académique)");
};
