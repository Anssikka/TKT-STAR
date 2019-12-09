import React, { useState, useEffect } from 'react'
import bookService from '../services/books'
import PageTitle from '../components/PageTitle'
import BookList from '../components/books/BookList'
import AddBookForm from '../components/books/AddBookForm'
import PageSubtitle from '../components/PageSubtitle'
import '../styles/RecommendationPage.css'
import FilterToggle from '../components/common/FilterToggle'

function BookPage() {
  const [books, setBooks] = useState([])
  const [isFiltered, setIsFiltered] = useState(false)

  useEffect(() => {
    getBooks()
  }, [])

  const getBooks = async () => {
    try {
      const savedBooks = await bookService.getBooks()
      setBooks(savedBooks)
    } catch (error) {
      console.log(error)
    }
  }

  const addBook = async book => {
    try {
      const createdBook = await bookService.createBook(book)
      setBooks(books.concat(createdBook))
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggle = async id => {
    const book = books.find(b => b.id === id)

    if (book) {
      const updatedBook = await bookService.markAsRead(book.id)
      setBooks(books.map(b => (b.id === updatedBook.id ? updatedBook : b)))
    }
  }

  const handleFilter = async () => {
    if (isFiltered) {
      await getBooks()
      setIsFiltered(!isFiltered)
    } else {
      setBooks(books.filter(b => b.isRead))
      setIsFiltered(!isFiltered)
    }
  }

  return (
    <main className="recommendation-page">
      <PageTitle title="Book Recommendations" />
      <PageSubtitle title="Add a Book" />
      <AddBookForm handleSubmit={addBook} />
      <FilterToggle
        filterText="Show read books"
        resetText="Show all books"
        handleFilter={handleFilter}
        isFiltered={isFiltered}
      />
      <BookList title="Saved Books" books={books} handleToggle={handleToggle} />
    </main>
  )
}

export default BookPage
