import React from 'react'
import TagList from '../common/TagList'
import '../../styles/Recommendation.css'

function Video({ id, title, url, tags }) {
  const showUrl = () =>
    url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    ) : null

  return (
    <div className="recommendation">
      <h5>{title}</h5>
      {showUrl()}
      <h6 className="recommendation-tag-title">Tags:</h6>
      <TagList recommendationId={id} tags={tags} />
    </div>
  )
}

export default Video
