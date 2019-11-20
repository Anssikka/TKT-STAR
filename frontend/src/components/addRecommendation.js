import React, { useState } from 'react'
import createBook from '../services/communicator'

const AddBookForm = () => {
    const [author, setAuthor] = useState('')
    const [isbn, setIsbn] = useState('')
    const [tags, setTags] = useState('')
    const [title, setTitle] = useState('')


    const handleSubmit = async event => {
      event.preventDefault()
      const book = await createBook({ author,title })
      setAuthor("")
      setTitle("")
    }

  return (
    <div className="book-form-wrapper">
      <form className="book-form" onSubmit={ handleSubmit }>
        <input
          type="text"
          placeholder="Type your book author: "
          value={ author }
          onChange={({ target }) => setAuthor(target.value)}
        />

        <input
          type="text"
          placeholder="Type your book titlte: "
          value={ title }
          onChange={({ target }) => setTitle(target.value)}
        />

        <span />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
  
}
export default AddBookForm
