import { Journal } from './../pages'
import { Navigate, Route, Routes } from 'react-router-dom'

const JournalRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Journal />} />

      <Route path='/*' element={<Navigate to='/' />} />
    </Routes>
  )
}
export default JournalRoutes