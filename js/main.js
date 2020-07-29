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
