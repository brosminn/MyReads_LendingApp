import React, { Component } from "react"
import * as ReactBootstrap from 'react-bootstrap'
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import { Link } from 'react-router-dom'

class BooksListRow extends Component {

    onShelfChanged(eventKey, eventObj, book) {
        let childElements = eventObj.target.closest("ul").children;
        for (var i = 0; i < childElements.length; i++) {
            childElements[i].classList.remove('active');
        }
        eventObj.target.closest("li").classList.add("active");
        this.props.onShelfChanged(eventKey, book);
    }

    camelCaseToWords = function (str) {
        return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function (x) {
            return x[0].toUpperCase() + x.substr(1).toLowerCase();
        }).join(' ');
    };

    render() {
        let currentBook = this.props.book;
        let shelfName = "None"
        if(currentBook.shelf !== null && currentBook.shelf !==  undefined) {
            shelfName = this.camelCaseToWords(currentBook.shelf);
        }
        
        return (
            <li>
                {currentBook && currentBook.imageLinks && (
                    <div className="book">
                        <div className="book-top">
                            <Link to={{ pathname: '/Book', query: { bookId: currentBook.id, source: this.props.source, searchTerm: this.props.searchTerm } }}>
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${currentBook.imageLinks.thumbnail})` }}></div>
                            </Link>
                            <div >
                                <ReactBootstrap.ButtonGroup className="book-shelf-changer">
                                    <ReactBootstrap.DropdownButton id="dropdown-btn-menu" bsStyle="success" title="" onSelect={(eventKey, eventObj) => this.onShelfChanged(eventKey, eventObj, currentBook)}>
                                        <ReactBootstrap.MenuItem eventKey="1" disabled>Move to...</ReactBootstrap.MenuItem>
                                        <ReactBootstrap.MenuItem eventKey="currentlyReading" active={shelfName === "Currently Reading"}>Currently Reading</ReactBootstrap.MenuItem>
                                        <ReactBootstrap.MenuItem eventKey="wantToRead" active={shelfName === "Want To Read"}>Want to Read</ReactBootstrap.MenuItem>
                                        <ReactBootstrap.MenuItem eventKey="read" active={shelfName === "Read"}>Read</ReactBootstrap.MenuItem>
                                        <ReactBootstrap.MenuItem eventKey="None" active={shelfName === "None"}>None</ReactBootstrap.MenuItem>
                                    </ReactBootstrap.DropdownButton>
                                </ReactBootstrap.ButtonGroup>
                            </div>
                        </div>
                        <div className="book-title">{currentBook.title}</div>
                        {currentBook.authors && (<div className="book-authors">{currentBook.authors.map(function (author) {
                            return <div key={author}> {author} </div>;
                        })}</div>)}
                    </div>
                )}
            </li>
        )
    }
}

export default BooksListRow