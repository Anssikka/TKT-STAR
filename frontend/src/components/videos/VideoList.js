import React from 'react'
import Video from './Video'
import PageSubtitle from '../PageSubtitle'

function VideoList({ videos, title }) {
    const showTitle = () => ( title ? <PageSubtitle title={title} /> : null )
    const mapToVideos = () => {
        return videos ? videos.map( video => <Video key={video.id} {...video} /> ) : null
    }

    return (
        <div>
            {showTitle()}
            {mapToVideos()}
        </div>
    )
}

export default VideoList