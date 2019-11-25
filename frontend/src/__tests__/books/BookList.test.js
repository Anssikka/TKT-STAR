import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import BookList from '../../components/books/BookList'

afterEach(cleanup)

describe('<BookList/>', () => {
  it('has correct books', async () => {
    const books = [
      { id: 1, title: 'Title #1' },
      { id: 2, title: 'Title #2' }
    ]
    const component = render(<BookList books={books} />)

    const firstBook = await component.findByText('Title #1')
    const secondBook = await component.findByText('Title #2')
    expect(firstBook).toBeDefined()
    expect(secondBook).toBeDefined()
  })

  it('can render without books', async () => {
    const component = render(<BookList />)
    expect(component).toBeDefined()
  })
})
