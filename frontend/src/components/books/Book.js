import React from 'react'
import '../../styles/Book.css'
import Toggle from '../common/Toggle'

function Book({ title, author, isbn, tags, read, handleToggle }) {
  const showAuthor = () => (author ? <h6 className="book-author">{author}</h6> : null)
  const showIsbn = () => (isbn ? <small>{isbn}</small> : null)
  const showToggle = () => {
    const toggleText = read ? 'Mark as not read' : 'Mark as read'
    return <Toggle text={toggleText} handleToggle={handleToggle} className="book-toggle button" />
  }
  const showTags = () => {
    if (Array.isArray(tags)) {
      return (
        <>
          <h6 className="book-tag-title">Tags:</h6>
          <ul>
            {tags.map(tag => (
              <li key={`${title}-${tag}`}>{tag}</li>
            ))}
          </ul>
        </>
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
      {showToggle()}
      {showTags()}
    </div>
  )
}

export default Book
