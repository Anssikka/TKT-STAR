import axios from 'axios'
const baseUrl = 'http://127.0.0.1:5000/api/recommendations/books'

const createBook = async book => {
  const response = await axios.post(baseUrl, book)
  return response.data
}

const getBooks = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const updateBook = async book => {
  const response = await axios.put(baseUrl, book)
  return response.data
}

const markAsRead = async id => {
  const response = await axios.post(`${baseUrl}/${id}`)
  return response.data
}

export default { createBook, getBooks, updateBook, markAsRead }
