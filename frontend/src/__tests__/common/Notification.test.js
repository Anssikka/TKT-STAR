import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Notification from '../../components/common/Notification'

afterEach(cleanup)

describe('<Notification />', () => {
  it('renders a notification', () => {
  const notificationText = 'Example notification'
  const component = render(<Notification text={notificationText} />)
  expect(component.container).toHaveTextContent(notificationText)
})

it('returns null if no input', () => {
  const component = render(<Notification text='' />)
  expect(component.container).toBeEmpty()
})
})
