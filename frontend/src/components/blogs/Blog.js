import React from 'react'
import TagList from '../common/TagList'
import '../../styles/Recommendation.css'
import '../../styles/Blog.css'

function Blog({ id, url, blogger, title, tags }) {
  const showUrl = () =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    ) : null
  const showBlogger = () => (blogger ? <h6 className="blogger">{blogger}</h6> : null)

  return (
    <div className="recommendation">
      <h5>{title}</h5>
      {showBlogger()}
      {showUrl()}
      <h6 className="recommendation-tag-title">Tags:</h6>
      <TagList recommendationId={id} tags={tags} />
    </div>
  )
}

export default Blog
