import { Grid, Typography } from '@mui/material'

const Auth = ({ children, title = '' }) => {
  return (
    <Grid
      alignItems='center'
      container
      direction='column'
      justifyContent='center'
      spacing={0}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
    >
      <Grid
        className='box-shadow animate__animated animate__fadeInDown'
        item
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2, width: { sm: 450 } }}
        xs={3}
      >
        <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>
        {children}
      </Grid>
    </Grid>
  )
}
export default Auth