export const initialState = {
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  status: 'checking',
  uid: null
}

export const authenticatedState = {
  displayName: 'userTest',
  email: 'userTest@domain.com',
  errorMessage: null,
  photoURL: 'http://test.com/test.jpg',
  status: 'authenticated',
  uid: '666'
}

export const notAuthenticatedState = {
  displayName: null,
  email: null,
  errorMessage: null,
  photoURL: null,
  status: 'not-authenticated',
  uid: null
}

export const demoUser = {
  displayName: 'demoUser',
  email: 'demo@domain.com',
  photoURL: 'http://test.com/demo.jpg',
  uid: '123'
}