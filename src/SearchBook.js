import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'


class SearchBook extends Component {

    render() {

        const { books, searchBook, onUpdateBook } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">

                  <Link className="close-search" to='/'>Close</Link>

                  <div className="search-books-input-wrapper">

                    <input
                      type="text"
                      onChange={(event) => {
                          searchBook(event.target.value)
                      }}
                      placeholder="Search by title or author"/>

                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                      { books.length === 0 && (
                          <span>No results</span>
                      )}
                      { books
                          .map((book) => (
                            <li key={book.id}>
                              <Book
                                onUpdateBook={onUpdateBook}
                                bookInfo={book}
                              />
                            </li>
                          ))}
                  </ol>
                </div>
            </div>
        )

    }


}

export default SearchBook
