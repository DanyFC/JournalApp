import { CircularProgress, Grid } from '@mui/material'

const authChecking = () => {
  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      justifyContent='center'
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        container
        className='animate__animated animate__fadeIn'
        direction='row'
        justifyContent='center'
      >
        <CircularProgress color='error' />
      </Grid>
    </Grid>
  )
}
export default authChecking