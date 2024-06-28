/**
 * @jest-environment jsdom
*/
import { authSlice } from '../../store/auth'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from '../../fixtures/auth'
import { Provider } from 'react-redux'
import Login from './Login'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

/* eslint-disable no-undef */
const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock('../../store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: (formData) => () => mockStartLoginWithEmailPassword(formData)
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

describe('Tests in <Login />', () => {

  beforeEach(() => jest.clearAllMocks())

  test.skip('Can be match with snapshot.', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test.skip('Login with google must call startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )
    const googleButton = screen.getByRole('button', { name: 'Google' })

    fireEvent.click(googleButton)

    expect(mockStartGoogleSignIn).toHaveBeenCalled()
  })

  test('Submit must call startLoginWithEmailPassword with form values', () => {
    const formData = {
      email: 'user@gmail.com',
      password: '123456'
    }

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    )
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const passwordInput = screen.getByLabelText('Password')
    const form = screen.getByLabelText('login-form')

    fireEvent.change(emailInput, { target: { name: 'email', value: formData.email } })
    fireEvent.change(passwordInput, { target: { name: 'password', value: formData.password } })
    fireEvent.submit(form)

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith(formData)
  })
})
/* eslint-enable no-undef */
