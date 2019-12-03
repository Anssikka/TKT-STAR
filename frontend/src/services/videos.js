import axios from 'axios'
const baseUrl = 'http://localhost:5000/api/recommendations/videos'

const createVideo = async video => {
  const response = await axios.post(baseUrl, video)
  return response.data
}

const getVideos = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { createVideo, getVideos }
