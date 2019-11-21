import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import PageTitle from '../../components/PageTitle'

afterEach(cleanup)

it('renders a title', () => {
  const title = 'Example title'
  const component = render(<PageTitle title={title} />)
  expect(component.container).toHaveTextContent(title)
})
