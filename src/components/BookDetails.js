import React, { Component } from "react"
import * as BooksAPI from "../api/BooksAPI"
import "../styles/App.css"


class BookDetails extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentBook: {}
        };
    }

    componentDidMount() {
        let bookId = this.props.history.location.query["bookId"];
        BooksAPI.get(bookId).then((bookResult) => {
            this.setState({ currentBook: bookResult });
        });
    }

    onClickCloseBookDetails = (event) => {
        event.preventDefault()
        this.props.onCloseBookDetails(this.props.history.location.query["source"], this.props.history.location.query["searchTerm"]);
    }

    render() {
        let currentBook = this.state.currentBook;
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <a className="close-search" onClick={() => this.onClickCloseBookDetails(event)}>Close</a>
                    </div>
                    <div className="search-books-results">
                        {currentBook && currentBook.imageLinks && (
                            <div>
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentBook.imageLinks.thumbnail})` }}></div>
                                <label className="book-details-label"> Title : </label> <div className="book-details-title">{currentBook.title}</div>
                                <label className="book-details-label">Subtitle: </label><div className="book-details-title">{currentBook.subtitle}</div>
                                <label className="book-details-label">Authors : </label> {currentBook.authors && (<div >{currentBook.authors.map(function (author) {
                                    return <div key={author}> {author} </div>;
                                })}</div>)}
                                <label className="book-details-label">Publisher: </label><div className="book-details-title">{currentBook.publisher}</div>
                                <label className="book-details-label">PublishedDate: </label><div className="book-details-title">{currentBook.publishedDate}</div>
                                <label className="book-details-label">Description: </label><div className="book-details-title">{currentBook.description}</div>
                                <label className="book-details-label">PageCount:</label><div className="book-details-title">{currentBook.pageCount}</div>
                                <label className="book-details-label">Categories: </label>{currentBook.categories && (<div >{currentBook.categories.map(function (category) {
                                    return <div key={category}> {category} </div>;
                                })}</div>)}
                                <label className="book-details-label">AverageRating: </label><div className="book-details-title">{currentBook.averageRating}</div>
                                <label className="book-details-label">RatingCount: </label><div className="book-details-title">{currentBook.ratingsCount}</div>
                                <label className="book-details-label">MaturityRating: </label><div className="book-details-title">{currentBook.maturityRating}</div>
                                <label className="book-details-label">ContentVersion: </label><div className="book-details-title">{currentBook.contentVersion}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default BookDetails