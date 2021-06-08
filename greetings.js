const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings"),
    logOut = document.querySelector(".logout");

const USER_LS = "currentUser",
    HIDE = "hide";

function saveName(text){
    localStorage.setItem(USER_LS, text)
}

function handleSubmit(event) {
    const currentValue = input.value;

    paintGreetings(currentValue)
    saveName(currentValue)
}

function askForName() {
    form.classList.remove(HIDE)
    form.addEventListener("submit", handleSubmit)
}

function paintGreetings(text) {
    form.classList.add(HIDE);
    greetings.classList.remove(HIDE);
    logOut.classList.remove(HIDE);
    greetings.innerText = `Hello, ${text}`;
}   

function logoutFn(event){
    form.classList.remove(HIDE);
    greetings.classList.add(HIDE);
    logOut.classList.add(HIDE);
    location.reload();

    localStorage.removeItem(USER_LS);
    
}

function showLogOutBtn() {
    const btn = document.createElement("btn");

    btn.classList.add("logoutBtn");
    btn.innerText = "Log Out";
    logOut.append(btn);
    btn.addEventListener("click", logoutFn);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser == null) {
        askForName();
    } else {
        paintGreetings(currentUser);
        showLogOutBtn();
    }
}

function init() {
    loadName();
}

init();