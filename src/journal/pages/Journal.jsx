import { AddOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Note, NothingSelected } from './../views'
import { startNewNote } from '../../store/journal'
import { useDispatch, useSelector } from 'react-redux'
import JournalLayout from '../layout/JournalLayout'

const Journal = () => {
  const dispatch = useDispatch()
  const { activeNote, isSaving } = useSelector(state => state.journal)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>
      {activeNote ? <Note /> : <NothingSelected />}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          ':disabled': { backgroundColor: 'disabled.background', color: 'disabled.main' },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
export default Journal