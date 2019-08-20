const form = document.querySelector(".greeting form");
const h1 = document.querySelector(".greeting h1");
const input = document.querySelector(".greeting input");
const USER_LS = "user";
const HIDE = "hide";
const SHOW = "show";

function handleSubmit(event) {
  event.preventDefault();
  localStorage.setItem(USER_LS, input.value);
  input.classList.remove(SHOW);
  paintGreeting(input.value);
  input.value = "";
}

function paintGreeting(text) {
  h1.classList.add(SHOW);
  h1.innerText = `Hello ${text}`;
}

function init() {
  const currentName = localStorage.getItem(USER_LS);
  if (currentName === null) {
    form.addEventListener("submit", handleSubmit);
    input.classList.add(SHOW);
  } else {
    h1.innerText = `Hello ${currentName}`;
    h1.classList.add(SHOW);
  }
}

init();
