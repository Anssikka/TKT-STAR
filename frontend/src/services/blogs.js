import axios from 'axios'
const baseUrl = '/api/recommendations/blogs'

const getBlogs = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async blog => {
  const response = await axios.post(baseUrl, blog)
  return response.data
}

export default { getBlogs, createBlog }
