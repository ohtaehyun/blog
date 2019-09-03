const row = document.querySelector(".row");
const addListBtn = document.querySelector(".add-list-btn");
let bubbles = document.querySelectorAll(".bubble");

const CLASS_BUBBLE = "bubble";
const CLASS_DISPLAY_NONE = "display-none";
const CLASS_CARD = "card";
const DEFAULT_LIST_NAME = "SOMETHING";
const DEFAULT_CARD_TEXT = "SOMETHING TO DO";
let trolloList = [];

function dropBtnClick(event) {
  this.parentNode.querySelector(".drops").classList.toggle(CLASS_DISPLAY_NONE);
}

function cardSubmitClicked() {
  bubbles = document.querySelectorAll(".bubble");
  const bubbleIdx = Array.from(row.children).indexOf(
    this.parentNode.parentNode.parentNode
  );
  const selfIdx = Array.from(this.parentNode.parentNode.children).indexOf(
    this.parentNode
  );
  console.log("bidx", bubbleIdx);
  console.log("sidx", selfIdx);
  console.log(trolloList);
  trolloList[bubbleIdx].cardList[selfIdx] = this.parentNode.querySelector(
    ".card-text"
  ).value;
  localStorage.setItem("trolloList", JSON.stringify(trolloList));
  console.log(trolloList);
}

function addCardClick(event) {
  const addCardBtns = document.querySelectorAll(".add-card");
  const bubbleIdx = Array.from(row.children).indexOf(
    this.parentNode.parentNode.parentNode
  );

  this.parentNode.classList.add(CLASS_DISPLAY_NONE);
  card = document.createElement("div");
  card.classList.add(CLASS_CARD);
  card.innerHTML = `<textarea class="card-text" name="" id="" >${DEFAULT_CARD_TEXT}</textarea>
  <button class="card-submit">save</button>`;
  this.parentNode.parentNode.parentNode
    .querySelector(".bubble-content")
    .appendChild(card);

  card
    .querySelector(".card-submit")
    .addEventListener("click", cardSubmitClicked);
  trolloList[bubbleIdx].cardList.push(DEFAULT_CARD_TEXT);
  localStorage.setItem("trolloList", JSON.stringify(trolloList));
}

function addListBtnClick(event) {
  const bubble = document.createElement("div");
  bubble.classList.add(CLASS_BUBBLE);
  bubble.innerHTML = ` <div class="bubble-title">
  <input type="text" name="" id="" value=${DEFAULT_LIST_NAME} />
  <button class="drop-btn">=</button>
  <div class="drops display-none">
    <button class="add-card" href="">Add Card</button>
  </div>
</div><div class="bubble-content"></div>`;

  row.appendChild(bubble);
  bubble.querySelector(".drop-btn").addEventListener("click", dropBtnClick);
  bubble.querySelector(".add-card").addEventListener("click", addCardClick);
  obj = {
    name: DEFAULT_LIST_NAME,
    cardList: []
  };
  trolloList.push(obj);
  bubbles = document.querySelectorAll(".bubble");
  localStorage.setItem("trolloList", JSON.stringify(trolloList));
  console.log(trolloList);
}

function drawBubbles() {
  console.log("trollo.length", trolloList.length);
  trolloList.forEach(element => {
    const bubble = document.createElement("div");
    bubble.classList.add(CLASS_BUBBLE);
    bubble.innerHTML = ` <div class="bubble-title">
    <input type="text" name="" id="" value=${element.name} />
    <button class="drop-btn">=</button>
    <div class="drops display-none">
      <button class="add-card" href="">Add Card</button>
    </div>
  </div><div class="bubble-content"></div>`;
    row.appendChild(bubble);
    bubble.querySelector(".drop-btn").addEventListener("click", dropBtnClick);
    bubble.querySelector(".add-card").addEventListener("click", addCardClick);
    element.cardList.forEach(element2 => {
      card = document.createElement("div");
      card.classList.add(CLASS_CARD);
      card.innerHTML = `<textarea class="card-text" name="" id="" >${element2}</textarea>
        <button class="card-submit">save</button>`;
      bubble.querySelector(".bubble-content").appendChild(card);
      card
        .querySelector(".card-submit")
        .addEventListener("click", cardSubmitClicked);
    });
  });
}

function init() {
  addListBtn.addEventListener("click", addListBtnClick);

  if (localStorage.getItem("trolloList")) {
    trolloList = JSON.parse(localStorage.getItem("trolloList"));
    drawBubbles();
  }
}

init();
