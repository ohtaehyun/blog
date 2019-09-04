const row = document.querySelector(".row");
const addListBtn = document.querySelector(".add-list-btn");
const body = document.querySelector("body");
let bubbles = document.querySelectorAll(".bubble");

const CLASS_BUBBLE = "bubble";
const CLASS_DISPLAY_NONE = "display-none";
const CLASS_CARD = "card";
const CLASS_MODAL_FRAME = "modal-frame";
const CLASS_CARD_TEXT = "card-text";
const CLASS_MODAL = "modal";
const CLASS_EXIT_BUTTON = "exit-button";
const CLASS_CARD_SUBMIT = "card-submit";
const CLASS_DESC_TEXT = "desc-text";
const CLASS_DIVIDER = "divider";
const CLASS_DEL_lIST = "del-list";
const DEFAULT_LIST_NAME = "SOMETHING";
const DEFAULT_CARD_TEXT = "SOMETHING TO DO";
const DEFAULT_DESC_TEXT = "DESCRIPTION HERE";
let trolloList = [];

function deleteButtonClicked(delButton, bubbleIdx) {
  delButton.addEventListener("click", function() {
    trolloList.splice(bubbleIdx, 1);
    localStorage.setItem("trolloList", JSON.stringify(trolloList));
    drawBubbles();
  });
}
function exitButtonClicked(exitButton, bubbleIdx, selfIdx) {
  exitButton.addEventListener("click", function() {
    localStorage.setItem("trolloList", JSON.stringify(trolloList));
    drawBubbles();
    body.removeChild(exitButton.parentNode.parentNode);
  });
}

function pToCardText(p, bubbleIdx, selfIdx, className) {
  p.addEventListener("click", function() {
    const textarea = document.createElement("textarea");
    textarea.classList.add(className);
    textarea.value = this.textContent;
    textarea.addEventListener("input", textareaHeightHandle);
    cardTextBlur(textarea, bubbleIdx, selfIdx, className);
    this.parentNode.replaceChild(textarea, p);
  });
}

function cardTextBlur(textarea, bubbleIdx, selfIdx, className) {
  textarea.addEventListener("blur", function() {
    p = document.createElement("p");
    p.classList.add(className);
    p.textContent = this.value;
    if (className === CLASS_CARD_TEXT) {
      trolloList[bubbleIdx].cardList[selfIdx] = this.value;
      pToCardText(p, bubbleIdx, selfIdx, CLASS_CARD_TEXT);
    } else {
      trolloList[bubbleIdx].descList[selfIdx] = this.value;
      pToCardText(p, bubbleIdx, selfIdx, CLASS_DESC_TEXT);
    }
    this.parentNode.replaceChild(p, this);
  });
}

function textareaHeightHandle() {
  this.style.height = "";
  this.style.height = this.scrollHeight + "px";
}

function cardClicked(event) {
  const bubbleIdx = Array.from(row.children).indexOf(
    this.parentNode.parentNode
  );

  const selfIdx = Array.from(this.parentNode.children).indexOf(this);

  const modalFrame = document.createElement("div");
  modalFrame.classList.add(CLASS_MODAL_FRAME);

  const modal = document.createElement("div");
  modal.classList.add(CLASS_MODAL);

  const title = document.createElement("p");
  title.textContent = "Card Title";

  const cardText = document.createElement("p");
  cardText.textContent = this.querySelector(".card-text").textContent;
  cardText.addEventListener("input", textareaHeightHandle);
  cardText.classList.add(CLASS_CARD_TEXT);
  pToCardText(cardText, bubbleIdx, selfIdx, CLASS_CARD_TEXT);

  const small = document.createElement("small");
  small.textContent = "in list " + trolloList[bubbleIdx].name;

  const divider = document.createElement("div");
  divider.classList.add(CLASS_DIVIDER);

  const desc = document.createElement("p");
  desc.textContent = "Description";

  const desText = document.createElement("p");
  desText.classList.add(CLASS_DESC_TEXT);
  desText.textContent = trolloList[bubbleIdx].descList[selfIdx];
  desText.addEventListener("input", textareaHeightHandle);
  pToCardText(desText, bubbleIdx, selfIdx, CLASS_DESC_TEXT);

  const exitButton = document.createElement("button");
  exitButton.textContent = "X";
  exitButton.classList.add(CLASS_EXIT_BUTTON);

  exitButtonClicked(exitButton, bubbleIdx, selfIdx);

  modal.appendChild(exitButton);
  modal.appendChild(title);
  modal.appendChild(cardText);
  modal.appendChild(small);
  modal.appendChild(divider);
  modal.appendChild(desc);
  modal.appendChild(desText);

  modalFrame.appendChild(modal);
  body.appendChild(modalFrame);
}

function bubbleTitleBlur(event) {
  const bubbleIdx = Array.from(row.children).indexOf(
    this.parentNode.parentNode
  );
  trolloList[bubbleIdx].name = this.value;
  localStorage.setItem("trolloList", JSON.stringify(trolloList));
}

function dropBtnClick(event) {
  this.parentNode.querySelector(".drops").classList.toggle(CLASS_DISPLAY_NONE);
}

function dropBtnBlur(event) {
  console.log(this);
  this.classList.add(CLASS_DISPLAY_NONE);
}

function cardSubmitClicked(event) {
  const bubbleIdx = Array.from(row.children).indexOf(
    this.parentNode.parentNode.parentNode
  );

  const selfIdx = Array.from(this.parentNode.parentNode.children).indexOf(
    this.parentNode
  );

  trolloList[bubbleIdx].cardList[selfIdx] = this.parentNode.querySelector(
    ".card-text"
  ).value;

  localStorage.setItem("trolloList", JSON.stringify(trolloList));
  this.parentNode.addEventListener("click", cardClicked);
  this.parentNode.innerHTML = `<p class="card-text">${
    this.parentNode.querySelector(".card-text").value
  }</p>`;
}

function addCardClick(event) {
  const bubbleIdx = Array.from(row.children).indexOf(
    this.parentNode.parentNode.parentNode
  );

  this.parentNode.classList.add(CLASS_DISPLAY_NONE);
  card = document.createElement("div");
  card.classList.add(CLASS_CARD);

  cardText = document.createElement("textarea");
  cardText.classList.add(CLASS_CARD_TEXT);
  cardText.textContent = DEFAULT_CARD_TEXT;
  cardText.addEventListener("input", textareaHeightHandle);
  cardText.addEventListener("blur", cardSubmitClicked);

  cardSubmit = document.createElement("button");
  cardSubmit.classList.add(CLASS_CARD_SUBMIT);
  cardSubmit.addEventListener("click", cardSubmitClicked);
  cardSubmit.textContent = "save";

  card.appendChild(cardText);
  card.appendChild(cardSubmit);

  this.parentNode.parentNode.parentNode
    .querySelector(".bubble-content")
    .appendChild(card);
  cardText.focus();
  trolloList[bubbleIdx].cardList.push(DEFAULT_CARD_TEXT);
  trolloList[bubbleIdx].descList.push(DEFAULT_DESC_TEXT);
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
    <button class="del-list" href="">Del List</button>
  </div>
</div><div class="bubble-content"></div>`;

  row.appendChild(bubble);
  bubbleIdx = Array.from(row.children).indexOf(bubble);
  bubble.querySelector(".drop-btn").addEventListener("click", dropBtnClick);
  bubble.querySelector(".drop-btn").addEventListener("focusout", dropBtnBlur);
  bubble.querySelector(".add-card").addEventListener("click", addCardClick);
  deleteButtonClicked(bubble.querySelector(".del-list"), bubbleIdx);
  bubble
    .querySelector(".bubble-title input")
    .addEventListener("blur", bubbleTitleBlur);
  const obj = {
    name: DEFAULT_LIST_NAME,
    cardList: [],
    descList: []
  };
  trolloList.push(obj);
  bubbles = document.querySelectorAll(".bubble");
  localStorage.setItem("trolloList", JSON.stringify(trolloList));
  bubble.querySelector("input").focus();
}

function drawBubbles() {
  row.innerHTML = "";
  trolloList = JSON.parse(localStorage.getItem("trolloList"));
  trolloList.forEach(element => {
    const bubble = document.createElement("div");
    bubble.classList.add(CLASS_BUBBLE);
    bubble.innerHTML = ` <div class="bubble-title">
    <input type="text" name="" id="" value=${element.name} />
    <button class="drop-btn">=</button>
    <div class="drops display-none">
      <button class="add-card" href="">Add Card</button>
      <button class="del-list" href="">Del List</button>
    </div>
  </div><div class="bubble-content"></div>`;
    row.appendChild(bubble);
    bubbleIdx = Array.from(row.children).indexOf(bubble);
    bubble.querySelector(".drop-btn").addEventListener("click", dropBtnClick);
    bubble.querySelector(".drops").addEventListener("mouseleave", dropBtnBlur);
    bubble.querySelector(".add-card").addEventListener("click", addCardClick);
    bubble.querySelector("input").addEventListener("blur", bubbleTitleBlur);
    deleteButtonClicked(bubble.querySelector(".del-list"), bubbleIdx);
    element.cardList.forEach(element2 => {
      card = document.createElement("div");
      card.classList.add(CLASS_CARD);
      card.innerHTML = `<p class="card-text" name="" id="" >${element2}</p>`;
      bubble.querySelector(".bubble-content").appendChild(card);
      card.addEventListener("click", cardClicked);
    });
  });
}

function init() {
  addListBtn.addEventListener("click", addListBtnClick);

  if (localStorage.getItem("trolloList")) {
    drawBubbles();
  }
}

init();
