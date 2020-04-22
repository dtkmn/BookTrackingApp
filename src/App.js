import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: []
  }

  componentDidMount() {
      this.getBooks()
  }

  /**
  * @description Get list of books from backend and store the result in books state
  */
  getBooks = () => {
      BooksAPI.getAll()
        .then((books) => {
            this.setState(() => ({
                books: books.filter((b) => {
                    return b.authors && b.imageLinks
                })
            }))
        })
  }

  /**
  * @description Search the books from backend based on query and store in searchBooks state
  * @param {string} searchTerms - the search query to backend
  */
  searchBook = (searchTerms) => {
      if (searchTerms.trim().length === 0) {
          this.setState(() => ({
              searchBooks: []
          }))
      } else {
          BooksAPI.search(searchTerms)
            .then((searchBooks) => {
                console.log(searchBooks)
                if (!searchBooks || searchBooks.error) {
                    this.setState(() => ({
                        searchBooks: []
                    }))
                } else {
                    const resultBooks = searchBooks
                        .filter((b) => {
                            return b.authors && b.imageLinks
                        })
                        .map((filterBook) => (
                            this.state.books.forEach((book) => {
                                if (filterBook.id === book.id) {
                                    filterBook.shelf = book.shelf
                                }
                            })
                        ))
                    this.setState(() => ({
                        searchBooks: resultBooks
                    }))
                }
            })
      }
  }

  /**
  * @description Update the shelf for specific book on backend
  * @param {object} book
  * @param {string} shelfValue
  */
  updateBook = (book, shelfValue) => {
      BooksAPI.update(book, shelfValue)
        .then((response) => {
            this.getBooks()
        })
  }



  render() {

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBook={this.updateBook}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBook
            books={this.state.searchBooks}
            searchBook={this.searchBook}
            onUpdateBook={this.updateBook}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
