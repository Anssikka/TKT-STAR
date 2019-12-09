import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import LinkRow from '../../components/recommendations/LinkRow'
import { BrowserRouter as Router, Route } from 'react-router-dom'

afterEach(cleanup)

describe('<Book />', () => {
  it('has correct links', () => {
    const component = render(
      <Router>
        <Route render={() => <LinkRow />} />
      </Router>
    )
    expect(component.asFragment()).toMatchSnapshot()
  })
})
