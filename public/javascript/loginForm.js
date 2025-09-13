const loginForm = document.querySelector(".login-form");
const error = document.querySelector(".info.error");

document.addEventListener("DOMContentLoaded", async () => {

    error.innerHTML = "";

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
    // console.log(username, password);
    

    try {
        const res = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await res.json();
        // console.log("Data: ",data);
        
        if (res.ok) {
            window.location.href = "/";
        } else {
            error.innerHTML = `<em>Error: ${data.error}.</em><em>Make sure you are an author.</em>`
        }

    } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred during login.");
    }
})