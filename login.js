// scripts.js

document.addEventListener("DOMContentLoaded", function () {
  const switchToSignup = document.getElementById("switch-to-signup");
  const switchToLogin = document.getElementById("switch-to-login");
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("new-username");
  const passwordInput = document.getElementById("new-password");
  const reenterPasswordInput = document.getElementById("reenter-password");
  const signupBtn = document.getElementById("signup-btn");
  const emailError = document.getElementById("email-error");
  const hostelGroup = document.getElementById("hostel-group");
  const statusSelect = document.getElementById("status");
  const reenterPasswordGroup = document.getElementById("reenter-password-group");

  switchToSignup.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  switchToLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  emailInput.addEventListener("input", function () {
    const email = emailInput.value.trim();
    if (email.endsWith("@rvce.edu.in")) {
      emailError.classList.add("hidden");
      usernameInput.value = email.split("@")[0]; // Set username to part before '@'
      usernameInput.removeAttribute("readonly");
    } else {
      emailError.classList.remove("hidden");
      usernameInput.value = ""; // Clear username if email is invalid
      usernameInput.setAttribute("readonly", true);
    }
    validateForm();
  });

  passwordInput.addEventListener("input", validateForm);
  reenterPasswordInput.addEventListener("input", validateForm);
  statusSelect.addEventListener("change", function () {
    if (statusSelect.value === "hosteler") {
      hostelGroup.classList.remove("hidden");
    } else {
      hostelGroup.classList.add("hidden");
    }
    validateForm();
  });

  function validateForm() {
    if (statusSelect.value === "hosteler") {
      reenterPasswordGroup.classList.remove("hidden");
      signupBtn.disabled = passwordInput.value === "" || reenterPasswordInput.value === "";
    } else {
      reenterPasswordGroup.classList.add("hidden");
      signupBtn.disabled = passwordInput.value === "";
    }

    if (passwordInput.value !== reenterPasswordInput.value) {
      signupBtn.disabled = true;
    }
  }
});
