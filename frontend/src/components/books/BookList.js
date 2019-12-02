import React from 'react'
import Book from './Book'
import PageSubtitle from '../PageSubtitle'

function BookList({ books, title, handleToggle }) {
  const showTitle = () => (title ? <PageSubtitle title={title} /> : null)
  const mapToBooks = () => {
    return books
      ? books.map(book => (
          <Book key={book.id} handleToggle={() => handleToggle(book.id)} {...book} />
        ))
      : null
  }

  return (
    <div>
      {showTitle()}
      {mapToBooks()}
    </div>
  )
}

export default BookList
