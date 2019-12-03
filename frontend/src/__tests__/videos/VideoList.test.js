import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import VideoList from '../../components/videos/VideosList'

afterEach(cleanup)

describe('<VideoList/>', () => {
    it('has correct videos', async () => {
        const videos = [
            { id: 1, title: 'Title 1' },
            { id: 2, title: 'Title 2' }
        ]
        const component = render(<VideoList videos={videos} />)

        const firstVideo = await component.findByText('Title 1')
        const secondVideo = await component.findByText('Title 2')
        expect(firstVideo).toBeDefined()
        expect(secondVideo).toBeDefined()
    })

    it('can render without videos', async () => {
        const component = render(<VideoList />)
        expect(component).toBeDefined()
    })
})