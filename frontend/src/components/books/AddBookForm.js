import React, { useState } from 'react'
import '../../styles/Form.css'

const AddBookForm = ({ handleSubmit }) => {
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const book = { title, author, isbn }
    const error = await handleSubmit(book)
    if (!error) {
      resetForm()
    } else {
      // Handle error
    }
  }

  const resetForm = () => {
    setAuthor('')
    setTitle('')
    setIsbn('')
  }

  return (
    <div className="book-form-wrapper">
      <form className="book-form" onSubmit={onSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Type your book title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          data-testid="add-book-title"
        />

        <label>Author:</label>
        <input
          type="text"
          placeholder="Type your book author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          data-testid="add-book-author"
        />

        <label>ISBN:</label>
        <input
          type="text"
          placeholder="Type your book isbn"
          value={isbn}
          onChange={({ target }) => setIsbn(target.value)}
          data-testid="add-book-isbn"
        />

        <input className="form-submit" type="submit" value="Submit" data-testid="add-book-submit" />
      </form>
    </div>
  )
}
export default AddBookForm
