import React, { useState } from 'react'
import bookService from '../../services/books'

const AddBookForm = () => {
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const book = await bookService.createBook({ author, title })
    setAuthor('')
    setTitle('')
  }

  return (
    <div className="book-form-wrapper">
      <form className="book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your book author: "
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          data-testid="add-book-author"
        />

        <input
          type="text"
          placeholder="Type your book titlte: "
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          data-testid="add-book-title"
        />

        <input type="submit" value="Submit" data-testid="add-book-submit" />
      </form>
    </div>
  )
}
export default AddBookForm
