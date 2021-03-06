import React, { Component } from "react"
import { Route } from "react-router-dom"
import * as BooksAPI from "../api/BooksAPI"
import Shelves from "./Shelves"
import BooksSearch from "./BooksSearch"
import BookDetails from "./BookDetails"
import "../styles/App.css"

class BooksApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      shelf: {
        books: new Map()
      }
    };
  }

  componentDidMount() {
    this.getAllBooks();
  }

  onShelfChangedInApp = (shelf, book) => {
    BooksAPI.update(book, shelf).then((updateResult) => {
      this.getAllBooks();
    });
  }

  getAllBooks() {
    BooksAPI.getAll().then((booksList) => {
      let booksMap = new Map();
      //Here I am just grouping the books in the array based on its shelve and 
      //placing the same in the MAP object. Based on the suggestion i tried
      //using map and filter function of array but i couldnt achieve this, 
      //requesting you to let me know how to do this.
      booksList.forEach(function (book) {
        if (booksMap.has(book.shelf)) {
          let tempArray = booksMap.get(book.shelf);
          tempArray.push(book);
          booksMap.set(book.shelf, tempArray)
        } else {
          let tempArray = [];
          tempArray.push(book);
          booksMap.set(book.shelf, tempArray)
        }
      });
      const shelf = { books: booksMap };
      this.setState({ shelf: shelf});
    });
  }

  render() {
    return (
      <div className="app">
        
        <Route exact path="/" render={({ history }) => (
          <Shelves shelf={this.state.shelf} history={history} onShelfChanged={this.onShelfChangedInApp} />
        )} />

        <Route path="/Search" render={({ history }) => (
          <BooksSearch currentBookList={Array.from(this.state.shelf.books.values())} history={history} onCloseSearch={() => {
            this.getAllBooks();
            history.push('/');
          }} />
        )} />

        <Route exact path="/Book" render={({ history }) => (
          <BookDetails history={history} onCloseBookDetails={(source, addtInfo) => {
            if (source === "Search") {
              history.push({
                pathname: '/Search',
                query: { searchterm: addtInfo }
              });
            } else {
              history.push('/');
            }
          }} />
        )} />

      </div>
    )
  }
}

export default BooksApp
