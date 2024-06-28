import { Box, Toolbar } from '@mui/material'
import { Navbar, Sidebar } from '../components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const drawerWidth = 240

const JournalLayout = ({ children }) => {
  const { savedMessage } = useSelector(state => state.journal)

  useEffect(() => {
    if (savedMessage) {
      Swal.fire({
        title: "Note Updated!",
        text: savedMessage,
        icon: "success",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
      })
    }
  }, [savedMessage])

  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeInUp'>
      <Navbar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />

      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3, }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
export default JournalLayout