/**
 * @jest-environment jsdom
*/
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import AuthRoutes from './AuthRoutes'

/* eslint-disable no-undef */
// eslint-disable-next-line react/display-name
jest.mock('./../pages/Login', () => () => {
  return <h1>LoginPage</h1>
})

// eslint-disable-next-line react/display-name
jest.mock('./../pages/Register', () => () => {
  return <h1>RegisterPage</h1>
})

describe('Tests in <AuthRoutes />', () => {

  test('Should show the login page.', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthRoutes />
      </MemoryRouter>
    )

    expect(screen.getByText('LoginPage')).toBeTruthy()
  })

  test('Should show the register page.', () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <AuthRoutes />
      </MemoryRouter>
    )

    expect(screen.getByText('RegisterPage')).toBeTruthy()
  })
})
/* eslint-enable no-undef */
