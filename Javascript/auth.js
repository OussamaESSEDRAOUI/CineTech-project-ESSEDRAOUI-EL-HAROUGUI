/* =========================================
   AUTHENTIFICATION SIMULÉE – CineTech
   (localStorage – Projet académique)
   ========================================= */

let users = JSON.parse(localStorage.getItem("users")) || [];

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

/* ============================= */
/* POPUP UTILITAIRE */
/* ============================= */
function showPopup(message, confirm = false, callback = null) {
  const popup = document.getElementById("popup");
  const msg = document.getElementById("popupMessage");
  const btnConfirm = document.getElementById("popupConfirm");
  const btnCancel = document.getElementById("popupCancel");

  msg.textContent = message;
  popup.classList.remove("hidden");
  btnCancel.style.display = confirm ? "inline-block" : "none";

  btnConfirm.onclick = () => {
    popup.classList.add("hidden");
    if (callback) callback(true);
  };

  btnCancel.onclick = () => {
    popup.classList.add("hidden");
    if (callback) callback(false);
  };
}

/* ============================= */
/* CONNEXION */
/* ============================= */
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  const user = users.find(u => u.username === username);

  if (!user) {
    showPopup("Compte inexistant. Veuillez vous inscrire.");
    return;
  }

  if (user.password !== password) {
    showPopup("Mot de passe incorrect.");
    return;
  }

  showPopup("Connexion réussie ✔");
  loginForm.reset();
});

/* ============================= */
/* INSCRIPTION */
/* ============================= */
registerForm.addEventListener("submit", e => {
  e.preventDefault();

  const username = document.getElementById("registerUser").value.trim();
  const password = document.getElementById("registerPass").value.trim();

  if (users.find(u => u.username === username)) {
    showPopup("Ce compte existe déjà.");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  showPopup("Inscription réussie ✔");
  registerForm.reset();
});
