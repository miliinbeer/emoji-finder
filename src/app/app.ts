import { data } from "./data/data.js";

const cards = <HTMLElement>document.querySelector(".cards");
const input = <HTMLElement>document.querySelector("#input");
const pagination = <HTMLElement>document.querySelector(".pagination");

const notesOnPage = 12; // Колличество отображаемых карточек в одной странице

// ↓ Типы данных вложенных элементов массива объектов data
interface card {
  symbol: string;
  title: string;
  keywords: string;
}

// ↓ Функция по отображению карточек
function showCards(data: Array<card>) {
  cards.innerHTML = "";
  // Отображаение первых элементов массива
  data.slice(0, notesOnPage).forEach((item) => cards.append(createCard(item)));
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

let items = [];
let counOfItems = Math.ceil(data.length / notesOnPage) // Колличество элементов нумерации страниц 

// ↓ Цикл по добавлению ячеек в секцию с пагинацией ...
for (let i: number = 1; i <= counOfItems; i++){
  let item = document.createElement("div");
  item.classList.add("pagination__item")
  item.innerHTML = i.toString(); // Число становится текстом
  pagination.appendChild(item) 
  items.push(item) // ... и добавление элементов в пустой массив items
}

// ↓ Цикл для каждого элемента массива с событием
for (let item of items) {
  item.addEventListener("click", pagesCalculation);
}

// Функция по расчету страниц для раздела с пагинацией
function pagesCalculation(this: HTMLElement) {
  // ↓ This ссылается на содержимое элемента
  let pageNum = +this.innerHTML;
  let start = (pageNum - 1) * notesOnPage;
  let end = start + notesOnPage;
  let notes = data.slice(start, end);
  cards.innerHTML = "";
  for (let note of notes) {
    createItems(note);
  }
}
// ↓ Функция по отображению карточек по нажатию на ячейки
function createItems(text: card) {
  cards.append(createCard(text));
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