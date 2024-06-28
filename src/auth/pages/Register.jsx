import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { registerValidation } from '../validations'
import { startCreatingUserWithEmailPassword } from '../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { useMemo } from 'react'
import Auth from '../layout/Auth'

const formData = {
  displayName: '',
  email: '',
  password: '',
}

const Register = () => {
  const dispatch = useDispatch()

  const { errorMessage, status } = useSelector(state => state.auth)
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const { displayName, email, password, formState, errors, onInputChange, onHandleBlur, onSubmit } = useForm(formData, registerValidation, createAccount)

  function createAccount() {
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <Auth title='Register'>
      <form onSubmit={onSubmit} aria-label='register-form'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              error={!!errors.displayName}
              helperText={errors.displayName ? errors.displayName : null}
              label='Name'
              onChange={onInputChange}
              onBlur={onHandleBlur}
              placeholder='your name'
              name='displayName'
              type='text'
              value={displayName}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email : null}
              label='Email'
              onChange={onInputChange}
              onBlur={onHandleBlur}
              placeholder='example@domain.com'
              name='email'
              type='email'
              value={email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password : null}
              inputProps={{ 'aria-label': 'Password' }}
              label='Password'
              onChange={onInputChange}
              onBlur={onHandleBlur}
              placeholder='●●●●●●●●'
              name='password'
              type='password'
              value={password}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity='error'>{errorMessage}</Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant='contained' type='submit' disabled={isAuthenticating} fullWidth>
                Create account
              </Button>
            </Grid>
          </Grid>

        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Typography sx={{ mr: 1 }} >Do you already have an account?</Typography>
          <Link component={RouterLink} color='inherit' to='/auth/login'>
            Log in!
          </Link>
        </Grid>

      </form>
    </Auth>


  )
}
export default Register