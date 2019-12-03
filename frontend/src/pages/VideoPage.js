import React, { useState, useEffect } from 'react'
import videoService from '../services/videos'
import VideoList from '../components/videos/VideoList'
import AddVideoForm from '../components/videos/AddVideoForm'
import PageTitle from '../components/PageTitle'
import PageSubtitle from '../components/PageSubtitle'
import '../styles/RecommendationPage.css'

function VideoPage() {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    try {
      const savedVideos = await videoService.getVideos()
      setVideos(savedVideos)
    } catch (error) {
      console.log(error)
    }
  }

  const addVideo = async video => {
    try {
      const createdVideo = await videoService.createVideo(video)
      setVideos(videos.concat(createdVideo))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className="recommendation-page">
      <PageTitle title="Video Recommendations" />
      <PageSubtitle title="Add a Video" />
      <AddVideoForm handleSubmit={addVideo} />
      <VideoList title="Saved Videos" videos={videos} />
    </main>
  )
}

export default VideoPage
