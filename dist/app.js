import { data } from "./data/data.js";
const cards = document.querySelector(".cards");
const input = document.querySelector("#input");
// ↓ Функция по отображению карточек
function showCards(data) {
    cards.innerHTML = "";
    data.forEach((item) => cards.append(createCard(item)));
}
showCards(data);
// ↓ Функция по созданию карточки
function createCard(item) {
    let card = document.createElement("div");
    card.classList.add("cards__card");
    card.innerHTML = `
  <p class="cards__symbol">${item.symbol}</p>
  <p class="cards__title">${item.title}</p>
  <p class="cards__keywords">${[...createUniqueWords(item.keywords)].join(" ")}</p>`;
    return card;
}
// ↓ Функция по удалению одинаковых слов в описании карточки
function createUniqueWords(string) {
    const unique = string
        .toLowerCase()
        .split(" ")
        .filter((word) => word);
    return new Set(unique);
}
// ↓ Событие по поиску введеного названия
input.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase().trim();
    let filtered = data.filter((elem) => elem.keywords.toLowerCase().includes(value) ||
        elem.title.toLowerCase().includes(value));
    showCards(filtered);
});
