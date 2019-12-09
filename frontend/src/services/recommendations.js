import axios from 'axios'
const baseUrl = '/api/recommendations/'

const getRecommendations = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getRecommendationsByTag = async (tag) => {
  console.log(tag)
  const response = await axios.get(`${baseUrl}/tag/${tag}`)
  console.log(response.data)
  return response.data
}

export default { getRecommendations, getRecommendationsByTag }
