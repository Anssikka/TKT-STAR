import React, { useState } from 'react'
import '../../styles/Form.css'
import Notification from '../common/Notification'

const AddBookForm = ({ handleSubmit }) => {
  const [author, setAuthor] = useState('')
  const [isbn, setIsbn] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')
  
  const [notificationVisibility, setNotificationVisibility] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const tagsArray = tags.split(',').map(m => m.trim())
    const book = { title, author, isbn, tags : tagsArray }
    const error = await handleSubmit(book)
    if (!error) {
      setNotificationVisibility('Book added succesfully')
      setTimeout(() => setNotificationVisibility(''), 2000)  
      resetForm()
    } else {
      // Handle error
    }
  }

  const resetForm = () => {
    setAuthor('')
    setTitle('')
    setIsbn('')
    setTags('')
  }

  return (
    <>
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

        <label>Tags:</label>
        <input
          type="text"
          placeholder="Type your tags, comma separated"
          value={tags}
          onChange={({ target }) => setTags(target.value)}
          data-testid="add-book-tag"
        />

        <input className="form-submit" type="submit" value="Submit" data-testid="add-book-submit" />
      </form>
    </div>
   <Notification text={notificationVisibility} /></>
  )
}
export default AddBookForm
