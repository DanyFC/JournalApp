import { Login, Register } from './../pages'
import { Navigate, Route, Routes } from 'react-router-dom'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
export default AuthRoutes