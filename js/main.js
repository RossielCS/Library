/* eslint linebreak-style: ["error", "windows"] */

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const myLibrary = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    pages: '384',
    read: false,
  },
  {
    title: 'Lord of The Flies',
    author: 'William Golding',
    pages: '224',
    read: false,
  },
  {
    title: 'The Great Gatsby',
    author: 'F.Scott Fitzgerald',
    pages: '180',
    read: false,
  },
];

let countRows = 0;

const table = document.querySelector('table');
const data = Object.keys(myLibrary[0]);

function removeBook(info) {
  info.parentElement.remove();
}

function addButton(row) {
  const cell = row.insertCell();
  const btn = document.createElement('button');
  btn.addEventListener('click', e => {
    removeBook(e.target.parentElement);
  });
  const btnTxt = document.createTextNode('REMOVE');
  btn.appendChild(btnTxt);
  cell.appendChild(btn);
}

function generateTableHead(table, data) {
  const thead = table.createTHead();
  const row = thead.insertRow();
  data.forEach(x => {
    const th = document.createElement('th');
    const text = document.createTextNode(x);
    th.appendChild(text);
    row.appendChild(th);
  });
}

function generateTableBody(table, library) {
  library.forEach(x => {
    const row = table.insertRow();
    row.setAttribute('id', `row${countRows}`);
    const values = Object.values(x);
    values.forEach(y => {
      const cell = row.insertCell();
      const text = document.createTextNode(y);
      cell.appendChild(text);
      if (y === values[values.length - 1]) {
        addButton(row);
      }
    });
    countRows += 1;
  });
}

function render(table, data, library) {
  generateTableHead(table, data);
  generateTableBody(table, library);
}

function displayForm() {
  const form = document.getElementById('newBook');
  if (form.style.display === 'none') {
    form.style.display = 'block';
    document.getElementById('form').style.display = 'none';
  } else {
    form.style.display = 'none';
    document.getElementById('form').style.display = 'block';
  }
}

function btnDisplay() {
  document.getElementById('newBook').addEventListener('click', () => {
    displayForm();
  });
}

function getValuesFromForm(array) {
  const tempArray = [];
  array.forEach(element => {
    tempArray.push(element.value);
  });
  return tempArray;
}

function addBookToLibrary(tempBook) {
  myLibrary.push(tempBook);
  displayForm();
}

function addNewBookTable() {
  const row = table.insertRow();
  row.setAttribute('id', `row${countRows}`);
  const values = Object.values(myLibrary[myLibrary.length - 1]);
  values.forEach(x => {
    const cell = row.insertCell();
    const text = document.createTextNode(x);
    cell.appendChild(text);
  });
  addButton(row);
  countRows += 1;
}

// eslint-disable-next-line no-unused-vars
function createBook() {
  const allValues = getValuesFromForm(document.querySelectorAll('.values'));
  const { checked } = document.getElementById('read');
  const tempBook = new Book(...allValues, checked);
  addBookToLibrary(tempBook);
  addNewBookTable();
}

render(table, data, myLibrary);
btnDisplay();