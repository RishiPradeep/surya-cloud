document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      // Sending login data to the backend
      const response = await fetch("/patientLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Login successful, redirect to dashboard
        sessionStorage.clear();
        sessionStorage.setItem("name", username);
        window.location.href = "patient_dashboard.html";
      } else if (response.status === 401) {
        // Show error message for invalid credentials
        document.getElementById("error-message").style.display = "block";
      } else {
        console.error("An error occurred during login");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  });
