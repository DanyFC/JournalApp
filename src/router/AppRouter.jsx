import { AuthChecking } from './../ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthRoutes from './../auth/routes/AuthRoutes'
import JournalRoutes from './../journal/routes/JournalRoutes'
import { useCheckAuth } from '../hooks'

const AppRouter = () => {
  const { status } = useCheckAuth()

  if (status === 'checking') return <AuthChecking />

  return (
    <Routes>
      {
        status === 'authenticated'
          ? <Route path='/*' element={<JournalRoutes />} />
          : <Route path='/auth/*' element={<AuthRoutes />} />
      }
      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
export default AppRouter