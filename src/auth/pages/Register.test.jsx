/**
 * @jest-environment jsdom
*/
import { authSlice } from '../../store/auth'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { notAuthenticatedState } from '../../fixtures/auth'
import { Provider } from 'react-redux'
import Register from './Register'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
})

/* eslint-disable no-undef */
const mockStartCreatingUserWithEmailPassword = jest.fn()

jest.mock('./../../store/auth/thunks', () => ({
  startCreatingUserWithEmailPassword: (formData) => () => mockStartCreatingUserWithEmailPassword(formData)
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn()
}))

describe('Tests in <Register />', () => {

  beforeEach(() => jest.clearAllMocks())

  test('Can be match snapshot.', () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    )

    expect(container).toMatchSnapshot()
  })

  test('Should call startCreatingUserWithEmailPassword to submit.', () => {
    const formData = {
      name: 'userTest',
      email: 'test@test.com',
      password: '123456',
    }
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    )
    const nameInput = screen.getByRole('textbox', { name: 'Name' })
    const emailInput = screen.getByRole('textbox', { name: 'Email' })
    const passwordInput = screen.getByLabelText('Password')
    const form = screen.getByLabelText('register-form')

    fireEvent.change(nameInput, { target: { name: 'displayName', value: formData.name } })
    fireEvent.change(emailInput, { target: { name: 'email', value: formData.email } })
    fireEvent.change(passwordInput, { target: { name: 'password', value: formData.password } })
    fireEvent.submit(form)


    expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalled()
  })
})
/* eslint-enable no-undef */
