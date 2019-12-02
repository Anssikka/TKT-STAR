import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import Book from '../../components/books/Book'
// import '@types/jest'

afterEach(cleanup)

describe('<Book />', () => {
  it('can be rendered with title as only prop', async () => {
    const title = 'Book Title'
    const component = render(<Book title={title} />)
    const titleElement = await component.findByText(title)
    expect(titleElement).toBeDefined()
  })

  it('can be rendered with title, author, isbn and tags', async () => {
    const props = {
      title: 'Book Title',
      author: 'Book Author',
      isbn: '1234-4321',
      tags: [
        { id: 1, title: 'Tag #1' },
        { id: 2, title: 'Tag #2' }
      ]
    }
    const component = render(<Book {...props} />)
    const authorElement = await component.findByText(props.author)
    const isbnElement = await component.findByText(props.isbn)
    const tags = await component.findByRole('list')

    expect(authorElement).toBeDefined()
    expect(isbnElement).toBeDefined()
    expect(tags).toHaveTextContent(props.tags[0].title)
    expect(tags).toHaveTextContent(props.tags[1].title)
  })

  it('can be marked as read', async () => {
    const props = {
      title: 'Book Title',
      handleToggle: jest.fn()
    }

    const component = render(<Book {...props} />)
    const x = component.container.querySelector('.book-toggle')

    fireEvent.click(x)

    expect(props.handleToggle).toBeCalledTimes(1)
  })
})
