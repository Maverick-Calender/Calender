const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const timetableButton = document.getElementById("login-timetable-get");
const loginErrorMsg = document.getElementById("login-error-msg");

loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    (await window.requests.login(username, password)) ? document.getElementById("kamar").innerText = "Login Successful" : document.getElementById("kamar").innerText = "Login Failed"
})

timetableButton.addEventListener("click", async (e) => {
    e.preventDefault();
    var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

    console.log(today);

    document.getElementById("kamar").innerText =  (await window.requests.timetable())
})