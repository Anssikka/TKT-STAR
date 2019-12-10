import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react'
import AddVideoForm from '../../components/videos/AddVideoForm'

afterEach(cleanup)

describe('<AddVideoForm />', () => {
  it('sends correct data when submitted', async () => {
    const video = { title: 'test title', url: 'google.fi', tags: ['testing', '#1testing'] }
    const tagString = 'testing, #1testing'

    const handleSubmit = jest.fn().mockResolvedValue(video)
    const { component, titleInput, urlInput, tagInput, submit } = await setup(handleSubmit)

    fireEvent.change(titleInput, { target: { value: video.title } })
    fireEvent.change(urlInput, { target: { value: video.url } })
    fireEvent.change(tagInput, { target: { value: tagString } })

    await waitForElement(() => component.getByDisplayValue(video.title))
    await waitForElement(() => component.getByDisplayValue(video.url))
    await waitForElement(() => component.getByDisplayValue(tagString))

    fireEvent.click(submit)

    expect(handleSubmit).toBeCalledTimes(1)
    expect(handleSubmit).toBeCalledWith(video)
  })
})

const setup = async handleSubmit => {
  const component = render(<AddVideoForm handleSubmit={handleSubmit} />)
  const titleInput = await component.findByTestId('add-video-title')
  const urlInput = await component.findByTestId('add-video-url')
  const tagInput = await component.findByTestId('add-video-tag')
  const submit = await component.findByTestId('add-video-submit')

  return {
    component,
    titleInput,
    urlInput,
    tagInput,
    submit
  }
}
