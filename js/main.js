/* eslint linebreak-style: ["error", "windows"] */

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.changeReadStatus = () => {
  this.read = !this.read;
};

const myLibrary = [];

function createBook(values) {
  const newBook = new Book(...values);
  return newBook;
}

function addBookToLibrary(newBook, library) {
  library.push(newBook);
}

function removeBook(library, index) {
  library.splice(index, 1);
}

function changeBookStatus(library, index) {
  library[index].changeReadStatus();
}

function generateTableBody() {
  const verifyBody = document.getElementsByTagName('tbody')[0];
  if (verifyBody) verifyBody.remove();
  const table = document.getElementById('table');
  const tBody = document.createElement('tbody');
  tBody.setAttribute('id', 'tBody');
  table.appendChild(tBody);
}

function addButton(row, index, library) {
  const cell = row.insertCell();
  const btn = document.createElement('button');
  const btnTxt = document.createTextNode('REMOVE');
  btn.addEventListener('click', () => {
    removeBook(library, index);
    // eslint-disable-next-line no-use-before-define
    render(library);
  });
  btn.appendChild(btnTxt);
  cell.appendChild(btn);
}

function addValuesToBody(library) {
  const body = document.getElementById('tBody');
  let index = 0;
  library.forEach(x => {
    const row = body.insertRow();
    const values = Object.values(x);
    values.forEach(y => {
      const cell = row.insertCell();
      let content = '';
      if (typeof y === 'boolean') {
        content = document.createElement('input');
        content.setAttribute('type', 'checkbox');
        content.setAttribute('id', `checkbox${index}`)
        content.checked = y;
      } else {
        content = document.createTextNode(y);
      }
      cell.appendChild(content);
      if (y === values[values.length - 1]) {
        addButton(row, index, library);
      }
    });
    index += 1;
  });
}

function render(library) {
  generateTableBody();
  addValuesToBody(library);
}

function getValuesFromInput() {
  const textValues = document.querySelectorAll('.values');
  const { checked } = document.getElementById('read');
  const valuesArray = [];
  textValues.forEach(element => {
    valuesArray.push(element.value);
  });
  valuesArray.push(checked);
  return valuesArray;
}

function displayForm() {
  const button = document.getElementById('newBookBtn');
  const form = document.getElementById('form');
  if (button.style.display === 'none') {
    button.style.display = 'block';
    form.style.display = 'none';
  } else {
    button.style.display = 'none';
    form.style.display = 'block';
  }
}

function addEventNewBookButton(library) {
  const button = document.getElementById('addBookBtn');
  button.addEventListener('click', () => {
    const values = getValuesFromInput();
    const newBook = createBook(values);
    addBookToLibrary(newBook, library);
    render(library);
  });
}

function addEventDisplayButton() {
  const button = document.getElementById('newBookBtn');
  button.addEventListener('click', () => {
    displayForm();
  });
}

render(myLibrary);
addEventDisplayButton();
addEventNewBookButton(myLibrary);