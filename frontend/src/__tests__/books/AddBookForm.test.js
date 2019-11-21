import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, act } from '@testing-library/react'
import axios from 'axios'
import AddBookForm from '../../components/books/AddBookForm'

jest.mock('axios')

afterEach(cleanup)

it('sends request when book with title and author is given', async () => {
  await act(async () => {
    const { authorInput, titleInput, submit } = await setup()
    fireEvent.change(authorInput, { target: { value: 'Author' } })
    fireEvent.change(titleInput, { target: { value: 'Book Title' } })

    expect(authorInput.value).toBe('Author')
    expect(titleInput.value).toBe('Book Title')

    axios.post.mockResolvedValue(() =>
      Promise.resolve({
        data: { author: 'Author', title: 'Title' }
      })
    )

    fireEvent.click(submit)
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/api/books', {
      author: 'Author',
      title: 'Book Title'
    })
  })
})

const setup = async () => {
  const component = render(<AddBookForm />)
  const authorInput = await component.findByTestId('add-book-author')
  const titleInput = await component.findByTestId('add-book-title')
  const submit = await component.findByTestId('add-book-submit')
  return {
    authorInput,
    titleInput,
    submit
  }
}
