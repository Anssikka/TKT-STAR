import React, { useState } from 'react'
import '../../styles/Form.css'

import Notification from '../common/Notification'

const AddBookForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [blogger, setBlogger] = useState('')
  const [url, setUrl] = useState('')
  const [tags, setTags] = useState('')

  const [notificationVisibility, setNotificationVisibility] = useState('')

  const onSubmit = async event => {
    event.preventDefault()
    const blog = { title, blogger, url }
    const error = await handleSubmit(blog)
    if (!error) {
      setNotificationVisibility('Blog added succesfully')
      setTimeout(() => setNotificationVisibility(''), 2000)  
      resetForm()
    } else {
      // Handle error
    }
  }

  const resetForm = () => {
    setTitle('')
    setBlogger('')
    setUrl('')
    setTags('')
  }

  return (
    <>
    <div className="book-form-wrapper">
      <form className="book-form" onSubmit={onSubmit}>
        <label>Title:</label>
        <input
          type="text"
          placeholder="Type your hlog title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          data-testid="add-blog-title"
        />

        <label>Blogger:</label>
        <input
          type="text"
          placeholder="Type your blogger"
          value={blogger}
          onChange={({ target }) => setBlogger(target.value)}
          data-testid="add-blogger"
        />

        <label>Url:</label>
        <input
          type="text"
          placeholder="Type your blog url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          data-testid="add-blog-url"
        />

        <input className="form-submit" type="submit" value="Submit" data-testid="add-blog-submit" />
      </form>
    </div>
    <Notification text={notificationVisibility} />
    </>
  )
}
export default AddBookForm
