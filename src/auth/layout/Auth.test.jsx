/**
 * @jest-environment jsdom
*/
import { render, screen } from '@testing-library/react'
import Auth from './Auth'

/* eslint-disable no-undef */
describe('Tests in <Auth />', () => {

  const layoutContent = {
    title: 'Title layout',
    children: <h1>Children Layout</h1>
  }

  test('Can be match with snapshot.', () => {
    const { container } = render(
      <Auth title={layoutContent.title}>
        {layoutContent.children}
      </Auth>
    )

    expect(container).toMatchSnapshot()
  })

  test('Should show the title and the children.', () => {
    render(
      <Auth title={layoutContent.title}>
        {layoutContent.children}
      </Auth>
    )

    expect(screen.getByText(layoutContent.title)).toBeTruthy()
    expect(screen.getByText(layoutContent.children.props.children)).toBeTruthy()
  })
})
/* eslint-enable no-undef */
