import React, { useState } from 'react'
import '../../styles/Form.css'

import Notification from '../common/Notification'

const AddVideoForm = ({ handleSubmit }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [tags, setTags] = useState('')

    const [notificationVisibility, setNotificationVisibility] = useState('')

    const onSubmit = async event => {
        event.preventDefault()
        const tagsArray = tags.split(',').map(m => m.trim())
        const video = { title, url, tags : tagsArray }
        const error = await handleSubmit(video)
        if (!error) {
            setNotificationVisibility('Video added succesfully')
            setTimeout(() => setNotificationVisibility(''), 2000)  
            resetForm()
        } else {
            console.log('oops something went wrong')
        }
    }

    const resetForm = () => {
        setTitle('')
        setUrl('')
        setTags('')
    }

    return (
        <>
        <div className="video-form-wrapper">
            <form className="video-form" onSubmit={onSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    placeholder="Type your video title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                    data-testid="add-video-title"
                />

                <label>URL:</label>
                <input
                    type="text"
                    placeholder="Type your URL here"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                    data-testid="add-video-url"
                />

                <label>Tags:</label>
                <input
                    type="text"
                    placeholder="Type your tags, comma separated"
                    value={tags}
                    onChange={({ target }) => setTags(target.value)}
                    data-testid="add-video-tag"
                />

                <input className="form-submit" type="submit" value="Submit" data-testid="add-video-submit" />
            </form>
        </div>
        <Notification text={notificationVisibility} />
        </>
    )
}

export default AddVideoForm