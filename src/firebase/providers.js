import { ERROR_HANDLERS } from './errorHandlers'
import { FirebaseAuth } from './config'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(FirebaseAuth, googleProvider)
    const { displayName, email, photoURL, uid } = userCredential.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: ERROR_HANDLERS[error.code] || error.message
    }
  }
}

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
    const { uid, photoURL } = userCredential.user
    await updateProfile(FirebaseAuth.currentUser, { displayName })
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: ERROR_HANDLERS[error.code] || error.message
    }
  }
}

export const loginWithEmailPassword = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FirebaseAuth, email, password)
    const { displayName, photoURL, uid } = userCredential.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: ERROR_HANDLERS[error.code] || error.message
    }
  }
}

export const logoutFirebase = async () => {
  return await FirebaseAuth.signOut()
}