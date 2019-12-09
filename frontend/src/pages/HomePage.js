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

  useEffect(() => {
    recommendationService
      .getRecommendations()
      .then(savedRecommendations => {
        setBooks(savedRecommendations.book)
        setVideos(savedRecommendations.video)
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
      <RecommendationList books={books} videos={videos} markAsRead={markAsRead} />
    </main>
  )
}

export default HomePage
