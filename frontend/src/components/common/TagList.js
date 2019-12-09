import React from 'react'

function TagList({ tags, recommendationId }) {
  const getKey = id => `${recommendationId}-${id}`

  return (
    <div>
      {Array.isArray(tags) && tags.length ? (
        <ul>
          {tags.map(tag => (
            <li key={getKey(tag.id)}>{tag.title}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default TagList
