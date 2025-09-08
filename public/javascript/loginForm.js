const loginForm = document.querySelector(".login-form");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const authCheck = await fetch("http://localhost:3000/user/check", {
            method: "GET",
            credentials: 'include',
        });

        const data = await authCheck.json();

        if (data.loggedIn) {
            return window.location.href = "/";
        } else {
            const body = document.querySelector("body");
            body.classList.remove("hidden");
        }
    } catch (error) {
        console.error("Auth check error:", error);   
    }
})

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(username, password);
    

    try {
        const res = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await res.json();

        if (res.ok) {
            alert("Login successful!");
            
            window.location.href = "/";
        } else {
            alert(data.error || "Login failed");
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
    }
})