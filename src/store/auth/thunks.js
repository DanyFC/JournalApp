import { checkCredential, login, logout } from './'
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers'
import { clearState } from '../journal'

export const startLoginWithEmailPassword = (user) => {
  return async (dispatch) => {
    dispatch(checkCredential())
    const result = await loginWithEmailPassword(user)
    if (!result.ok) {
      dispatch(logout(result.errorMessage))
      return
    }
    dispatch(login(result))
  }
}

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkCredential())
    const result = await signInWithGoogle()
    if (!result.ok) {
      dispatch(logout(result.errorMessage))
      return
    }
    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailPassword = (newUser) => {
  return async (dispatch) => {
    dispatch(checkCredential())
    const result = await registerUserWithEmailPassword(newUser)
    if (!result.ok) {
      dispatch(logout(result.errorMessage))
      return
    }
    dispatch(login(result))
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()
    dispatch(clearState())
    dispatch(logout())
  }
}