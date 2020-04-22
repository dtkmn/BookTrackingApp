import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
    }

    render() {

        const { books, onUpdateBook } = this.props;

        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>

                  <BookShelf
                    title='Currently Reading'
                    onUpdateBook={onUpdateBook}
                    books={books.filter((book) => {
                      return book.shelf === 'currentlyReading'
                    })}
                  />

                  <BookShelf
                    title='Want to Read'
                    onUpdateBook={onUpdateBook}
                    books={books.filter((book) => {
                      return book.shelf === 'wantToRead'
                    })}
                  />

                  <BookShelf
                    title='Read'
                    onUpdateBook={onUpdateBook}
                    books={books.filter((book) => {
                      return book.shelf === 'read'
                    })}
                  />

                </div>
              </div>
              <div className="open-search">
                <Link
                  to='/search'
                >Add a book</Link>
              </div>
            </div>
        );

    }

}

export default ListBooks;
