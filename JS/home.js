document.addEventListener("DOMContentLoaded", () => {
  const publishBtn = document.getElementById("publishBtn");
  const heroPublishBtn = document.getElementById("heroPublishBtn");
  const loginNavBtn = document.getElementById("loginNavBtn");

  const tokenBanner = document.getElementById("tokenBanner");
  const tokenText = document.getElementById("tokenText");
  const logoutBtn = document.getElementById("logoutBtn");

  const token = sessionStorage.getItem("token");

  showTokenBanner(token);
  updateLoginButton(token);

  if (publishBtn) {
    publishBtn.addEventListener("click", goToPublishOrLogin);
  }

  if (heroPublishBtn) {
    heroPublishBtn.addEventListener("click", goToPublishOrLogin);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  function goToPublishOrLogin() {
    const currentToken = sessionStorage.getItem("token");

    if (!currentToken) {
      window.location.href = "login.html?redirect=index";
      return;
    }
  }

  function showTokenBanner(tokenValue) {
    if (!tokenValue) {
      tokenBanner.classList.add("hidden");
      return;
    }

    tokenBanner.classList.remove("hidden");
    tokenText.textContent = tokenValue;
  }

  function updateLoginButton(tokenValue) {
    if (!loginNavBtn) {
      return;
    }

    if (tokenValue) {
      loginNavBtn.textContent = "Sesión iniciada";
      loginNavBtn.classList.remove("nav-login");
      loginNavBtn.classList.add("active-link");
      loginNavBtn.href = "./index.html";
    }
  }

  function logoutUser() {
    sessionStorage.removeItem("token");
    window.location.href = "index.html";
  }
});