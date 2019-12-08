import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import Row from '../../components/common/Row'

afterEach(cleanup)

describe('<Row />', () => {
  it('renders with correct children', async () => {
    const component = render(
      <Row>
        <button>1</button>
        <button>2</button>
      </Row>
    )

    const firstButton = await component.findByText('1')
    const secondButton = await component.findByText('2')
    expect(firstButton).toBeDefined()
    expect(secondButton).toBeDefined()
  })
})
