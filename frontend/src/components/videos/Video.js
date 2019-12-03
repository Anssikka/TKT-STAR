import React from 'react'
import '../../styles/Recommendation.css'

function Video({ title, url, tags }) {
  const showUrl = () =>
    url ? (
      <a href={url} target="_blank">
        {url}
      </a>
    ) : null
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
    }
  }

  return (
    <div className="recommendation">
      <h5>{title}</h5>
      {showUrl()}
      {showTags()}
    </div>
  )
}

export default Video
