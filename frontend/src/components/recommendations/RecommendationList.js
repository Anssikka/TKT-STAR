import React from 'react'
import Book from '../books/Book'
import Blog from '../blogs/Blog'
import Video from '../videos/Video'
import '../../styles/RecommendationList.css'

function RecommendationList({books, videos, blogs, markAsRead }) {
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

  const mapToBlogs = () => {
    if (blogs) {
      return blogs.map(blog => <Blog key={blog.id} {...blog}/>)
    }
    return []
  }

  return (
    <div className="recommendation-list">
      {mapToBooks()}
      {mapToVideos()}
      {mapToBlogs()}
    </div>
  )
}

export default RecommendationList
