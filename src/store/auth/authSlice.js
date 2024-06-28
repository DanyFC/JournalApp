import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    displayName: null,
    email: null,
    errorMessage: null,
    photoURL: null,
    status: 'checking', // INFO: 'checking', 'not-authenticated', 'authenticated'
    uid: null
  },
  reducers: {
    checkCredential: (state) => {
      state.status = 'checking'
    },
    login: (state, { payload }) => {
      state.displayName = payload.displayName
      state.email = payload.email
      state.errorMessage = null
      state.photoURL = payload.photoURL
      state.status = 'authenticated'
      state.uid = payload.uid
    },
    logout: (state, { payload }) => {
      state.displayName = null
      state.email = null
      state.errorMessage = payload ? payload : null
      state.photoURL = null
      state.status = 'not-authenticated'
      state.uid = null
    }
  },
})

export const { checkCredential, login, logout } = authSlice.actions