import React, { Component } from "react"
import * as BooksAPI from "../api/BooksAPI"
import BooksListRow from "./BooksListRow"
import "../styles/App.css"

class searchBooks extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      books: []
    }
  }

  onClickCloseSearch = (event) => {
    event.preventDefault()
    this.props.onCloseSearch();
  }

  onChangeOfSearchQuery = (query) => {
    this.searchBooks(query);
  }

  componentDidMount() {
    if (this.props !== undefined && this.props.history !== undefined && this.props.history !== undefined
      && this.props.history.location.query !== undefined) {
      let query = this.props.history.location.query["searchterm"];
      document.getElementById("search-text").value = query;
      this.searchBooks(query);
    }
  }

  searchBooks(query) {
    const maxResults = 20;
    debugger;
    let currentBooks = this.props.currentBookList;
    if (query.trim() === "") {
      this.setState({ books: [], query: "" });
    } else {
      BooksAPI.search(query, maxResults).then((booksList) => {
        if (booksList !== null && booksList !== undefined && booksList.length > 0) {
          let tmpBooksList = [];
          booksList.forEach(function (book) {
            let foundBook = null;
            for (let bookArrInShelf of currentBooks) {
              for (let bookInShelf of bookArrInShelf) {
                if (bookInShelf.id === book.id) {
                  foundBook = bookInShelf;
                  break;
                }
              }
            }
            if (foundBook !== null && foundBook !== undefined) {
              book.shelf = foundBook.shelf;
            }
            tmpBooksList.push(book);
          });
          this.setState({ books: tmpBooksList, query: query });
        } else {
          this.setState({ books: [], query: query });
        }
      });
    }
  }

  onShelfChangedInBookSearch = (shelf, book) => {
    BooksAPI.update(book, shelf).then((updateResult) => {
      document.getElementById("update-result").innerHTML = "Book : \"" + book.title + "\", moved to \"" + shelf + "\" shelve";
      document.getElementById("update-result").style.display = 'block';
      setTimeout(function () { document.getElementById("update-result").style.display = 'none'; }, 2000);
    });
  }

  render() {
    const books = this.state.books;
    const query = this.state.query;
    let shelfChangedMethod = this.onShelfChangedInBookSearch;
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => this.onClickCloseSearch(event)}>Close</a>
            <div className="search-books-input-wrapper">
              <input type="text" id="search-text" placeholder="Search by title or author" onChange={(event) => this.onChangeOfSearchQuery(event.target.value)} />
            </div>
          </div>
          <div className="search-books-results">
            <div id="update-result" className="updateresult"></div>
            <ol className="books-grid">
              {books && (
                books.map(function (bookInput) {
                  return <BooksListRow source="Search" searchTerm={query} key={bookInput.id} book={bookInput} onShelfChanged={shelfChangedMethod} />;
                }))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default searchBooks


