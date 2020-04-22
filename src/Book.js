import React, { Component } from 'react';

class Book extends Component {

    state = {
        shelfValue: 'none'
    }

    componentDidMount() {
        this.setState({shelfValue: this.props.bookInfo.shelf});
    }

    render() {

        const { bookInfo, onUpdateBook } = this.props;

        return (
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookInfo.imageLinks.smallThumbnail})` }}></div>
                <div className="book-shelf-changer">
                  <select value={this.state.shelfValue}
                    onChange={(event) => {
                      this.setState({shelfValue: event.target.value});
                      onUpdateBook(bookInfo, event.target.value);
                    }}
                  >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{bookInfo.title}</div>
              <div className="book-authors">{bookInfo.authors}</div>
            </div>
        );

    }

}

export default Book;
