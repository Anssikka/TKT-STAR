import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, waitForElement } from '@testing-library/react'
import VideoPage from '../../pages/VideoPage'
import axios from 'axios'

afterEach(cleanup)

jest.mock('axios')

describe('<VideoPage />', () => {
  it('has correct elements', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Test 101',
          url: 'https://example.com',
          tags: [
            { id: 1, title: 'Tag #1' },
            { id: 2, title: 'Tag #2' }
          ]
        }
      ]
    })

    const component = render(<VideoPage />)
    await waitForElement(() => component.findByText('Test 101'))
    expect(component.asFragment()).toMatchSnapshot()
  })
})
