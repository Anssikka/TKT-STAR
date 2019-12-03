import React from 'react'

function Video({ title, url, tags }) {
    const showUrl = () => ( url ? <a href={url}>{url}</a> : null )
    const showTags = () => {
        if (Array.isArray(tags)) {
          return (
            <ul>
              {tags.map(tag => (
                <li key={`${title}-${tag.id}`}>{tag.title}</li>
              ))}
            </ul>
          )
        } 
      }

      return (
          <div className="video">
            <h5>{title}</h5>
            {showUrl()}
            <h6 className="video-tag-title">Tags:</h6>
            {showTags()}
          </div>
      )
}

export default Video