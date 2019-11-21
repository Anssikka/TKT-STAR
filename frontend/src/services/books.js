import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000/api/books'

const createBook = async ({ author, title }) => {
  const response = await axios.post(baseUrl, { author, title })
  return response.data
}

export default { createBook }
