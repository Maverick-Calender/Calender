const loginForm = document.getElementById("login-form");
const timetableButton = document.getElementById("login-timetable-get");
const loginErrorMsg = document.getElementById("login-error-msg");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("fdd");

    (await window.requests.login(loginForm.username.value, loginForm.password.value)) ? console.log("Failed") : console.log("Sucessful")
})