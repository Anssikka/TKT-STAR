import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import BlogList from '../../components/blogs/BlogList'

afterEach(cleanup)

describe('<BlogList />', () => {
  it('has correct blogs', async () => {
    const blogs = [
      { id: 1, title: 'Title #1', blogger: 'First Blogger' },
      { id: 2, title: 'Title #2', url: 'https://example.com' }
    ]
    const component = render(<BlogList blogs={blogs} />)

    const firstBlog = await component.findByText(blogs[0].blogger)
    const secondBlog = await component.findByText(blogs[1].url)
    expect(firstBlog).toBeDefined()
    expect(secondBlog).toBeDefined()
  })

  it('can render without blogs', async () => {
    const component = render(<BlogList />)
    expect(component).toBeDefined()
  })
})
