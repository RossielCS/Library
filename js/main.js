class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

Book.prototype.changeReadStatus = function auxFunction() {
  this.read = !this.read;
};

const myLibrary = [];

const myBookOne = new Book('To Kill a Mockingbird', 'Harper Lee', '384', true);
const myBookTwo = new Book('Lord of The Flies', 'William Golding', '224', false);

function createBook(values) {
  const newBook = new Book(...values);
  return newBook;
}

function addBook(newBook, library) {
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

function render(library) {
  generateTableBody();
  // eslint-disable-next-line no-use-before-define
  addValuesToBody(library);
}

function addButtonRemove(row, index, library) {
  const cell = row.insertCell();
  const btn = document.createElement('button');
  const btnTxt = document.createTextNode('REMOVE');
  btn.setAttribute('class', 'ui red button');
  btn.addEventListener('click', () => {
    removeBook(library, index);
    render(library);
  });
  btn.appendChild(btnTxt);
  cell.appendChild(btn);
}

function addCheckbox(value, index, library) {
  const container = document.createElement('div');
  container.setAttribute('class', 'ui checkbox');
  const label = document.createElement('label');
  const content = document.createElement('input');
  content.setAttribute('type', 'checkbox');
  content.setAttribute('id', `checkbox${index}`);
  content.checked = value;
  content.addEventListener('change', () => {
    changeBookStatus(library, index);
    render(library);
  });
  container.appendChild(content);
  container.appendChild(label);
  return container;
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
        content = addCheckbox(y, index, library);
      } else {
        content = document.createTextNode(y);
      }
      cell.appendChild(content);
      if (y === values[values.length - 1]) {
        addButtonRemove(row, index, library);
      }
    });
    index += 1;
  });
}

function getValuesFromInput() {
  const textValues = document.querySelectorAll('.values');
  const { checked } = document.getElementById('read');
  const valuesArray = [];
  for (let i = 0; i < textValues.length; i += 1) {
    if (textValues[i].value === '') return false;
    valuesArray.push(textValues[i].value);
  }
  valuesArray.push(checked);
  return valuesArray;
}

function verifyInput(library) {
  // eslint-disable-next-line no-undef
  $('.ui.form').form({
    fields: {
      title: {
        identifier: 'title',
        rules: [
          {
            type: 'minLength[5]',
            prompt: 'The title must be at least {ruleValue} characters long.',
          },
        ],
      },
      author: {
        identifier: 'author',
        rules: [
          {
            type: 'minLength[2]',
            prompt: 'The author\'s name must be at least {ruleValue} characters long.',
          },
        ],
      },
      pages: {
        identifier: 'pages',
        rules: [
          {
            type: 'minCount[1]',
            prompt: 'Please enter the number of pages.',
          },
        ],
      },
    },
    onSuccess(event) {
      event.preventDefault();
      const values = getValuesFromInput();
      if (typeof values === 'object') {
        const newBook = createBook(values);
        addBook(newBook, library);
        render(library);
        // eslint-disable-next-line no-undef
        $('.mini.modal').modal('hide');
      }
    },
  });
}

function clearInputs() {
  const textValues = document.querySelectorAll('.values');
  textValues.forEach(element => {
    element.value = '';
  });
  document.getElementById('read').checked = false;
}

function addEventNewBookButton(library) {
  const button = document.getElementById('addBookBtn');
  button.addEventListener('click', () => {
    verifyInput(library);
  });
}

function addEventDisplayButton() {
  const button = document.getElementById('newBookBtn');
  button.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    $('.mini.modal').modal('show');
    clearInputs();
  });
}

function addEventCancelButton() {
  const button = document.getElementById('cancelBtn');
  button.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    $('.mini.modal').modal('hide');
    clearInputs();
  });
}

addEventDisplayButton();
addEventNewBookButton(myLibrary);
addEventCancelButton();
addBook(myBookOne, myLibrary);
addBook(myBookTwo, myLibrary);
render(myLibrary);
