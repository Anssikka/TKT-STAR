import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import bookService from '../services/books'
import videoService from '../services/videos'
import RecommendationList from '../components/recommendations/RecommendationList'

function HomePage() {
  const [books, setBooks] = useState([])
  const [videos, setVideos] = useState([])

  useEffect(() => {
    bookService
      .getBooks()
      .then(savedBooks => setBooks(savedBooks))
      .catch(error => console.log(error))

    videoService
      .getVideos()
      .then(savedVideos => setVideos(savedVideos))
      .catch(error => console.log(error))
  }, [])

  const markAsRead = async id => {
    const updatedBook = await bookService.markAsRead(id)
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)))
  }

  return (
    <main>
      <Link to="/recommendations/books">Books</Link>
      <br />
      <Link to="/recommendations/videos">Videos</Link>
      <RecommendationList books={books} videos={videos} markAsRead={markAsRead} />
    </main>
  )
}

export default HomePage
