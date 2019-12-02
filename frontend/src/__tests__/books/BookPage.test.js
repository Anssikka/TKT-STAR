import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import BookPage from '../../pages/BookPage'
import axios from 'axios'

jest.mock('axios')

afterEach(cleanup)

describe('<BookPage />', () => {
  it('has correct elements', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Test 101',
          author: 'Tester',
          isbn: '1234-4321',
          tags: [
            { id: 1, title: 'Tag #1' },
            { id: 2, title: 'Tag #2' }
          ]
        },
        {
          id: 2,
          title: 'Only Title'
        }
      ]
    })
    const component = render(<BookPage />)
    await waitForElement(() => component.findByText('Test 101'))
    expect(component.asFragment()).toMatchSnapshot()
  })
})
