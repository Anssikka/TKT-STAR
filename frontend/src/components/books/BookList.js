import React from 'react'
import Book from './Book'
import PageSubtitle from '../PageSubtitle'

function BookList({ books, title }) {
  const showTitle = () => (title ? <PageSubtitle title={title} /> : null)
  const mapToBooks = () => {
    return books ? books.map(book => <Book key={book.id} {...book} />) : null
  }

  return (
    <div>
      {showTitle()}
      {mapToBooks()}
    </div>
  )
}

export default BookList
