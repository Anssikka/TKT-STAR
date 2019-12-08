import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import RecommendationList from '../../components/recommendations/RecommendationList'
// import '@types/jest'

afterEach(cleanup)

describe('<RecommendationList/>', () => {
  it('has correct books and videos', () => {
    const books = [
      { id: 1, title: 'Book #1' },
      { id: 2, title: 'Book #2' }
    ]

    const videos = [
      { id: 1, title: 'Video #1' },
      { id: 2, title: 'Video #2' }
    ]
    const component = render(
      <RecommendationList books={books} videos={videos} markAsRead={jest.fn()} />
    )
    expect(component.asFragment()).toMatchSnapshot()
  })
})
