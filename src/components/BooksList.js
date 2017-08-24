import React, { Component } from "react"
import PropTypes from 'prop-types'
import BooksListRow from "./BooksListRow"

class BooksList extends Component {
  static propTypes = {
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired
  }

  onShelfChangedInBooksList = (shelf, book)=> {
    this.props.onShelfChanged(shelf, book);
  }

  camelCaseToWords = function(str){
    return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(x){
        return x[0].toUpperCase() + x.substr(1).toLowerCase();
    }).join(' ');
};

  render() {
    let shelfName= this.props.shelfName;
    let books = this.props.books;
    shelfName = this.camelCaseToWords(shelfName);
    let shelfChangedMethod = this.onShelfChangedInBooksList;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books && (
              books.map(function (bookInput) {
                return <BooksListRow source="Shelves" searchTerm="" key={bookInput.id} book={bookInput} onShelfChanged={shelfChangedMethod}/>;
              }))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BooksList

