import React from 'react'
import '../../styles/Book.css'
import Switch from 'react-switch'

function Book({ title, author, isbn, tags, read, handleToggle }) {
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

  const getBookToggleTitle = () => (read ? 'Has been read' : 'Not read yet')

  return (
    <div className="book">
      <h5>{title}</h5>
      {showAuthor()}
      {showIsbn()}
      <h6 className="book-toggle-title">{getBookToggleTitle()}</h6>
      <Switch className="book-toggle" onChange={() => handleToggle()} checked={!!read} />
      <h6 className="book-tag-title">Tags:</h6>
      {showTags()}
    </div>
  )
}

export default Book
