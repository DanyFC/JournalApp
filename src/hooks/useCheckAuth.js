import { FirebaseAuth } from '../firebase/config'
import { login, logout } from '../store/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { startLoadingNotes } from '../store/journal'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export const useCheckAuth = () => {
  const { status } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async (user) => {
      if (!user) return dispatch(logout())

      const { displayName, email, photoURL, uid } = user
      dispatch(login({ displayName, email, photoURL, uid }))
      dispatch(startLoadingNotes())
    })
  }, [])

  return {
    status
  }

}