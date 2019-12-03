import React, { useState } from 'react'
import '../../styles/Form.css'

const AddVideoForm = ({ handleSubmit }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [tags, setTags] = useState('')

    const onSubmit = async event => {
        event.preventDefault()
        const video = { title, url }
        const error = await handleSubmit(video)
        if (!error) {
            resetForm()
        } else {
            console.log('oops something went wrong')
        }
    }

    const resetForm = () => {
        setTitle('')
        setUrl('')
    }

    return (
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

                <input className="form-submit" type="submit" value="Submit" data-testid="add-video-submit" />
            </form>
        </div>
    )
}

export default AddVideoForm