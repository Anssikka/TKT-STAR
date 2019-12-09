import React from 'react'
import Book from './Book'
import PageSubtitle from '../PageSubtitle'
import '../../styles/RecommendationList.css'

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
    <div className="recommendation-list">
      {showTitle()}
      {mapToBooks()}
    </div>
  )
}

export default BookList
