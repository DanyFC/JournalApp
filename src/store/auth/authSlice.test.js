/**
 * @jest-environment jsdom
*/
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from '../../fixtures/auth'
import { authSlice, checkCredential, login, logout } from './authSlice'

/* eslint-disable no-undef */
describe('Tests for authSlice', () => {

  test('Should return the initial state.', () => {
    const state = authSlice.reducer(initialState, {})

    expect(authSlice.name).toBe('auth')
    expect(state).toEqual(initialState)
  })

  test('Should make log in.', () => {
    const state = authSlice.reducer(initialState, login(demoUser))
    const { displayName, email, photoURL, uid } = demoUser

    expect(state).toEqual({
      displayName,
      errorMessage: null,
      email,
      photoURL,
      uid,
      status: 'authenticated',
    })
  })

  test('Should make log out.', () => {
    const state = authSlice.reducer(authenticatedState, logout())

    expect(state).toEqual(notAuthenticatedState)
  })

  test('Should make log out with a error message.', () => {
    const errorMessage = 'a random error'
    const state = authSlice.reducer(authenticatedState, logout(errorMessage))

    expect(state).toEqual({ ...notAuthenticatedState, errorMessage })
  })

  test('Should change the state to checking', () => {
    const state = authSlice.reducer(authenticatedState, checkCredential())

    expect(state.status).toBe('checking')
  })
})
/* eslint-enable no-undef */
