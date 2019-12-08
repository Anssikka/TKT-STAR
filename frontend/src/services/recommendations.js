import axios from 'axios'
const baseUrl = '/api/recommendations/'

const getRecommendations = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getRecommendations }
