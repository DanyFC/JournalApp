import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { startLogout } from '../../store/auth'
import { useDispatch } from 'react-redux'

const Navbar = ({ drawerWidth }) => {

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(startLogout())
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>

        <IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuOutlined />
        </IconButton>

        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' noWrap component='div'>Journal App</Typography>
          <IconButton color='error' onClick={onLogout} aria-label='logout-btn'>
            <LogoutOutlined />
          </IconButton>
        </Grid>

      </Toolbar>
    </AppBar>
  )
}
export default Navbar