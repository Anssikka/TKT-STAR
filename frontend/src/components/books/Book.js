import React from 'react'
import '../../styles/Book.css'
import '../../styles/Recommendation.css'
import Toggle from '../common/Toggle'
import TagList from '../common/TagList'

function Book({ id, title, author, isbn, tags, isRead, handleToggle }) {
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

  return (
    <div className="recommendation">
      <h5>{title}</h5>
      {showAuthor()}
      {showIsbn()}
      {showToggle()}
      <h6 className="recommendation-tag-title">Tags:</h6>
      <TagList recommendationId={id} tags={tags} />
    </div>
  )
}

export default Book
