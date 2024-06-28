import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { setActiveNote } from '../../store/journal'

const SidebarItem = ({ id, title = '', body = '', date = 0, imageUrls = [] }) => {
  const dispatch = useDispatch()

  const newTitle = useMemo(() => {
    return title.length > 15 ? title.substring(0, 17) + '...' : title
  }, [title])

  const newBody = useMemo(() => {
    return body.length > 40 ? body.substring(0, 40) + '...' : body
  }, [body])

  const onClickSidebarItem = () => {
    dispatch(setActiveNote({ id, title, body, date, imageUrls }))
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onClickSidebarItem}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={newBody} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
export default SidebarItem