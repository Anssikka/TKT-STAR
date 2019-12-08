import React from 'react'
import Book from '../books/Book'
import Video from '../videos/Video'
import '../../styles/RecommendationList.css'

function RecommendationList({ books, videos, markAsRead }) {
  const mapToBooks = () => {
    if (books) {
      return books.map(book => (
        <Book key={book.id} handleToggle={() => markAsRead(book.id)} {...book} />
      ))
    }
    return []
  }

  const mapToVideos = () => {
    if (videos) {
      return videos.map(video => <Video key={video.id} {...video} />)
    }
    return []
  }

  return (
    <div className="recommendation-list">
      {mapToBooks()}
      {mapToVideos()}
    </div>
  )
}

export default RecommendationList
