import React from 'react'
import '../../styles/Book.css'
import '../../styles/Recommendation.css'
import Toggle from '../common/Toggle'

function Book({ title, author, isbn, tags, isRead, handleToggle }) {
  const showAuthor = () => (author ? <h6 className="book-author">{author}</h6> : null)
  const showIsbn = () => (isbn ? <small>{isbn}</small> : null)
  const showToggle = () => {
    const toggleText = isRead ? 'Mark as not read' : 'Mark as read'
    return (
      <Toggle
        text={toggleText}
        handleToggle={handleToggle}
        className={`book-toggle toggle button ${isRead ? 'active' : null}`}
      />
    )
  }
  const showTags = () => {
    if (Array.isArray(tags) && tags.length) {
      return (
        <>
          <h6 className="recommendation-tag-title">Tags:</h6>
          <ul>
            {tags.map(tag => (
              <li key={`${title}-${tag.id}`}>{tag.title}</li>
            ))}
          </ul>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <div className="recommendation">
      <h5>{title}</h5>
      {showAuthor()}
      {showIsbn()}
      {showToggle()}
      {showTags()}
    </div>
  )
}

export default Book
