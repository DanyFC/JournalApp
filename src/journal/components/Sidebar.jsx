import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import SidebarItem from './SidebarItem'

const Sidebar = ({ drawerWidth }) => {

  const { displayName } = useSelector(state => state.auth)
  const { notes } = useSelector(state => state.journal)

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>{displayName}</Typography>
        </Toolbar>
        <Divider />
        <List className='animate__animated animate__slideInLeft animate__delay-1s'>
          {
            notes.map((note) => (
              <SidebarItem key={note.id} {...note} />
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
export default Sidebar