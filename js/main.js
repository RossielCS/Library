/* eslint linebreak-style: ["error", "windows"] */

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
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

render(table, data, myLibrary);