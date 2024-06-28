import { EditNote } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

const NothingSelected = () => {
  return (
    <Grid
      alignItems='center'
      container
      className='animate__animated animate__zoomIn animate__delay-1s'
      direction='column'
      justifyContent='center'
      spacing={0}
      sx={{ minHeight: 'calc(100vh - 120px)', backgroundColor: 'primary.main', borderRadius: 3 }}
    >
      <Grid item xs={12} className='animate__animated animate__heartBeat animate__delay-2s'>
        <EditNote sx={{ fontSize: 100, color: 'white' }} />
      </Grid>
      <Grid item xs={12} className='animate__animated animate__heartBeat animate__delay-2s'>
        <Typography color='white' variant='h5'>Select or create a new note.</Typography>
      </Grid>
    </Grid>
  )
}
export default NothingSelected