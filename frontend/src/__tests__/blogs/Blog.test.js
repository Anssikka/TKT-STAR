import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import Blog from '../../components/blogs/Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  it('can be rendered with id, url, blogger, title', async () => {
    const props = {
      id: 123456789,
      url: 'https://example.com',
      blogger: 'Test Tester',
      title: 'Testing 101'
    }
    const component = render(<Blog {...props} />)

    const url = await component.findByText(props.url)
    const blogger = await component.findByText(props.blogger)
    const title = await component.findByText(props.title)

    expect(url).toBeDefined()
    expect(blogger).toBeDefined()
    expect(title).toBeDefined()
  })

  it('has correct tags', async () => {
    const props = {
      title: 'Advanced Testing',
      tags: [
        { id: 42, title: 'testing' },
        { id: 13, title: 'advanced' }
      ]
    }
    const component = render(<Blog {...props} />)

    const firstTag = await component.findByText(props.tags[0].title)
    const secondTag = await component.findByText(props.tags[1].title)

    expect(firstTag).toBeDefined()
    expect(secondTag).toBeDefined()
  })
})
