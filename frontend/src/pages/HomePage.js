import React, { useState, useEffect } from 'react'
import bookService from '../services/books'
import recommendationService from '../services/recommendations'
import RecommendationList from '../components/recommendations/RecommendationList'
import PageTitle from '../components/PageTitle'
import PageSubtitle from '../components/PageSubtitle'
import LinkRow from '../components/recommendations/LinkRow'

function HomePage() {
  const [books, setBooks] = useState([])
  const [videos, setVideos] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    recommendationService
      .getRecommendations()
      .then(recommendations => {
        setBooks(recommendations.book)
        setVideos(recommendations.video)
        setBlogs(recommendations.blog)
      })
      .catch(error => console.log(error))
  }, [])

  const markAsRead = async id => {
    const updatedBook = await bookService.markAsRead(id)
    setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book)))
  }

  return (
    <main>
      <PageTitle title="Recommendations" />
      <PageSubtitle title="Add a Recommendation" />
      <LinkRow />
      <RecommendationList books={books} videos={videos} blogs={blogs} markAsRead={markAsRead} />
    </main>
  )
}

export default HomePage
