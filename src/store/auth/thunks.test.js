/**
 * @jest-environment jsdom
*/
import { checkCredential, login, logout } from './authSlice'
import { demoUser } from '../../fixtures/auth'
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from './thunks'
import { clearState } from '../journal'

/* eslint-disable no-undef */
jest.mock('../../firebase/providers')

describe('Tests for thunks', () => {

  const dispatch = jest.fn()
  beforeEach(() => jest.clearAllMocks)

  test('startLoginWithEmailPassword must call checkCredential and login.', async () => {
    const loginData = { ok: true, ...demoUser }
    const formData = { email: demoUser.email, password: '123456' }
    loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkCredential())
    expect(loginWithEmailPassword).toHaveBeenCalledWith(formData)
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startLoginWithEmailPassword must call checkCredential and logout.', async () => {
    const loginData = { ok: false, errorMessage: 'Wrong credentials.' }
    const formData = { email: demoUser.email, password: '123456' }
    loginWithEmailPassword.mockResolvedValue(loginData)

    await startLoginWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkCredential())
    expect(loginWithEmailPassword).toHaveBeenCalledWith(formData)
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startGoogleSignIn must call checkCredential and login.', async () => {
    const loginData = { ok: true, ...demoUser }
    signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkCredential())
    expect(dispatch).toHaveBeenCalledWith(login(loginData))
  })

  test('startGoogleSignIn must call checkCredential and logout.', async () => {
    const loginData = { ok: false, errorMessage: 'Something went wrong, please try again later.' }
    signInWithGoogle.mockResolvedValue(loginData)

    await startGoogleSignIn()(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkCredential())
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
  })

  test('startCreatingUserWithEmailPassword must call checkCredential and login.', async () => {
    const registerData = { ok: true, ...demoUser }
    const formData = { displayName: demoUser.displayName, email: demoUser.email, password: '123456' }
    registerUserWithEmailPassword.mockResolvedValue(registerData)

    await startCreatingUserWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkCredential())
    expect(registerUserWithEmailPassword).toHaveBeenCalledWith(formData)
    expect(dispatch).toHaveBeenCalledWith(login(registerData))
  })

  test('startCreatingUserWithEmailPassword must call checkCredential and logout.', async () => {
    const registerData = { ok: false, errorMessage: 'Something went wrong, please try again later.' }
    const formData = { displayName: demoUser.displayName, email: demoUser.email, password: '123456' }
    registerUserWithEmailPassword.mockResolvedValue(registerData)

    await startCreatingUserWithEmailPassword(formData)(dispatch)

    expect(dispatch).toHaveBeenCalledWith(checkCredential())
    expect(registerUserWithEmailPassword).toHaveBeenCalledWith(formData)
    expect(dispatch).toHaveBeenCalledWith(logout(registerData.errorMessage))
  })

  test('startLogout must call clearState and logout', async () => {
    await startLogout()(dispatch)

    expect(logoutFirebase).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(clearState())
    expect(dispatch).toHaveBeenCalledWith(logout())
  })
})
/* eslint-enable no-undef */
