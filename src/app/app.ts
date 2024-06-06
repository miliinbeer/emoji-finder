import { data } from "./data/data.js";

const cards = <HTMLElement>document.querySelector(".cards");
const input = <HTMLElement>document.querySelector("#input");

// ↓ Типы данных вложенных элементов массива объектов data
interface card {
  symbol: string;
  title: string;
  keywords: string;
}

// ↓ Функция по отображению карточек
function showCards(data: Array<card>) {
  cards.innerHTML = "";
  data.forEach((item) => cards.append(createCard(item)));
}
showCards(data);

// ↓ Функция по созданию карточки
function createCard(item: card) {
  let card = document.createElement("div");
  card.classList.add("cards__card");
  card.innerHTML = `
  <p class="cards__symbol">${item.symbol}</p>
  <p class="cards__title">${item.title}</p>
  <p class="cards__keywords">${[...createUniqueWords(item.keywords)].join(
    " "
  )}</p>`;
  return card;
}

// ↓ Функция по удалению одинаковых слов в описании карточки
function createUniqueWords(string: string) {
  const unique = string
    .toLowerCase()
    .split(" ")
    .filter((word) => word);
  return new Set(unique);
}

// ↓ Событие по поиску введеного названия
input.addEventListener("input", (event) => {
  const value = (event.target as HTMLInputElement).value.toLowerCase().trim();
  let filtered = data.filter(
    (elem) =>
      elem.keywords.toLowerCase().includes(value) ||
      elem.title.toLowerCase().includes(value)
  );
  showCards(filtered);
});