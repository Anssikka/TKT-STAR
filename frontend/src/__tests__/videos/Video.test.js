import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Video from '../../components/videos/Video'

afterEach(cleanup)

describe('<Video />', () => {
  it('can be rendered with title as only prop', async () => {
    const title = 'video title'
    const component = render(<Video title={title} />)
    const titleElement = await component.findByText(title)
    expect(titleElement).toBeDefined()
  })

  it('can be rendered with title, tags, and url', async () => {
    const props = {
      id: 123456789,
      title: 'test title',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tags: [
        { id: 1, title: 'tag1' },
        { id: 2, title: 'tag2' }
      ]
    }

    const component = render(<Video {...props} />)
    const urlElement = await component.findByText(props.url)
    const tags = await component.findByRole('list')

    expect(urlElement).toBeDefined()
    expect(tags).toHaveTextContent(props.tags[0].title)
    expect(tags).toHaveTextContent(props.tags[1].title)
  })
})
