// Ensure the axios script is already included in HTML
document.addEventListener("DOMContentLoaded", function () {
  const switchToSignup = document.getElementById("switch-to-signup");
  const switchToLogin = document.getElementById("switch-to-login");
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");
  const Studentnoinput = document.getElementById("Student no")
  const usernameInput = document.getElementById("new-username");
  const passwordInput = document.getElementById("new-password");
  const reenterPasswordInput = document.getElementById("reenter-password");
  const signupBtn = document.getElementById("signup-btn");

  const hostelGroup = document.getElementById("hostel-group");
  const statusSelect = document.getElementById("status");
  const reenterPasswordGroup = document.getElementById("reenter-password-group");

  // Switch to Signup
  switchToSignup.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
  });

  // Switch to Login
  switchToLogin.addEventListener("click", function (e) {
    e.preventDefault();
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  });

  // Email validation and setting username
  Studentnoinput.addEventListener("input", function () {
    const Studentno  = Studentnoinput.value.trim();
    usernameInput.value = Studentno;
  });

  usernameInput.addEventListener("input", function () {
    const username = usernameInput.value.trim();
    usernameInput.value = username;
  });

  // Password and Re-enter Password validation
  passwordInput.addEventListener("input", validateForm);
  reenterPasswordInput.addEventListener("input", validateForm);

  // Hosteller or Day Scholar status handling
  statusSelect.addEventListener("change", function () {
    if (statusSelect.value === "hosteler") {
      hostelGroup.classList.remove("hidden");
    } else {
      hostelGroup.classList.add("hidden");
    }
    validateForm();
  });

  // Form validation
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

  // Handle form submission
  const signupFormElement = signupForm.querySelector("form");
  signupFormElement.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(signupFormElement);

    // Send the form data with axios without any file upload
    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Signup successful!");
          window.location.href = "/dashboard"; // Redirect to dashboard
        } else {
          alert("Signup failed! Please try again.");
        }
      })
      .catch(error => {
        console.error("There was an error during signup:", error);
        alert("Signup failed! Please try again.");
      });
  });
});
