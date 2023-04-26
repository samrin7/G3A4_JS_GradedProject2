document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("errorMessage");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const username = usernameInput.value;
      const password = passwordInput.value;
  
      if (username === "Admin" && password === "Admin@1234") {
        errorMessage.style.display = "none";
        sessionStorage.setItem("loggedIn", "true");
        window.location.replace("resume.html");
      } else {
        errorMessage.textContent = "Invalid Credentials";
        errorMessage.style.display = "block";
      }
    });
  });