import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { DeleteOutline, Save, UploadOutlined } from '@mui/icons-material'
import { Gallery } from '../components'
import { startDeleteNote, startUpdateNote, startUploadingFiles } from '../../store/journal'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { useMemo, useRef } from 'react'

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const Note = () => {
  const dispatch = useDispatch()
  const fileInputRef = useRef()
  const { activeNote, isSaving } = useSelector(state => state.journal)

  const { formState, body, title, onInputChange, onHandleBlur, onSubmit } = useForm(activeNote, () => ({}), onSaveNote)

  const { date } = activeNote
  const dateString = useMemo(() => new Intl.DateTimeFormat('en-Us', options).format(date), [date])

  function onSaveNote() {
    dispatch(startUpdateNote(formState))
  }

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return
    dispatch(startUploadingFiles(formState, target.files))
  }

  const onDelete = () => {
    dispatch(startDeleteNote())
  }

  return (
    <Grid container direction='row' justifyContent='space-between' alignContent='start' sx={{ mb: 1, minHeight: 'calc(100vh - 128px)' }} className='animate__animated animate__slideInLeft'>

      <Grid item>
        <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
      </Grid>

      <Grid item>
        <input aria-label='file-btn' type='file' onChange={onFileInputChange} style={{ display: 'none' }} ref={fileInputRef} multiple />
        <IconButton color='primary' disabled={isSaving} onClick={() => fileInputRef.current.click()} >
          <UploadOutlined />
        </IconButton>

        <Button color='primary' sx={{ padding: 2 }} onClick={onSubmit} disabled={isSaving} >
          <Save sx={{ fontSize: 30, mr: 1 }} />
          Save
        </Button>
      </Grid>

      <Grid container sx={{ mt: 1 }}>
        <TextField
          fullWidth
          label='Title'
          placeholder='Enter a title'
          sx={{ border: 'none', mb: 1 }}
          type='text'
          variant='filled'
          name='title'
          value={title}
          onChange={onInputChange}
          onBlur={onHandleBlur}
        />

        <TextField
          fullWidth
          minRows={5}
          multiline
          placeholder='What happened today?'
          type='text'
          variant='filled'
          name='body'
          value={body}
          onChange={onInputChange}
          onBlur={onHandleBlur}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button
          color='error'
          onClick={onDelete}
          sx={{ mt: 2 }}
        >
          <DeleteOutline />
          Delete
        </Button>
      </Grid>

      <Gallery images={activeNote.imageUrls} />

    </Grid>
  )
}
export default Note