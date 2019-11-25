import React from 'react'
import '../../styles/Book.css'

function Book({ title, author, isbn, tags }) {
  const showAuthor = () => (author ? <h6 className="book-author">{author}</h6> : null)
  const showIsbn = () => (isbn ? <small>{isbn}</small> : null)
  const showTags = () => {
    if (Array.isArray(tags)) {
      return (
        <ul>
          {tags.map(tag => (
            <li key={`${title}-${tag}`}>{tag}</li>
          ))}
        </ul>
      )
    } else {
      return null
    }
  }

  return (
    <div className="book">
      <h5>{title}</h5>
      {showAuthor()}
      {showIsbn()}
      <h6 className="book-tag-title">Tags:</h6>
      {showTags()}
    </div>
  )
}

export default Book
