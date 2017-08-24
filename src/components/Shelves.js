import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BooksList from "./BooksList"

class Shelves extends Component {
  static propTypes = {
    shelf: PropTypes.object.isRequired,
  }

  onShelfChangedInShelves = (shelf, book) => {
    this.props.onShelfChanged(shelf, book);
  }

  render() {
    debugger;
    const { shelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Feroz's MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {Array.from(shelf.books.keys()).map((key, index) => {
              return <BooksList key={key} shelfName={key} books={shelf.books.get(key)} onShelfChanged={this.onShelfChangedInShelves}/>
            })}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/Search'
            className='open-search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelves