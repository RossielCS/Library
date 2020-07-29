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

const table = document.querySelector('table');
const data = Object.keys(myLibrary[0]);

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
    Object.values(x).forEach(y => {
      const cell = row.insertCell();
      const text = document.createTextNode(y);
      cell.appendChild(text);
    });
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

// eslint-disable-next-line no-unused-vars
function createBook() {
  const allvalues = getValuesFromForm(document.querySelectorAll('.values'));
  const { checked } = document.getElementById('read');
  const tempBook = new Book(...allvalues, checked);
  addBookToLibrary(tempBook);
}

function addNewBookTable() {
  
}

render(table, data, myLibrary);