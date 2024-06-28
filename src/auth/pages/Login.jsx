import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Google } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'
import { loginValidation } from './../validations'
import { startGoogleSignIn, startLoginWithEmailPassword } from './../../store/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks'
import { useMemo } from 'react'
import Auth from '../layout/Auth'

const formData = {
  email: '',
  password: ''
}

const Login = () => {
  const dispatch = useDispatch()
  const { status, errorMessage } = useSelector(state => state.auth)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const { email, password, formState, errors, onInputChange, onHandleBlur, onSubmit } = useForm(formData, loginValidation, signInWhitEmailPassword)

  function signInWhitEmailPassword() {
    dispatch(startLoginWithEmailPassword(formState))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <Auth title='Login'>
      <form onSubmit={onSubmit} aria-label='login-form'>
        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              label='Email'
              name='email'
              onChange={onInputChange}
              onBlur={onHandleBlur}
              placeholder='example@domain.com'
              type='email'
              value={email}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              inputProps={{ 'aria-label': 'Password' }}
              label='Password'
              name='password'
              onChange={onInputChange}
              onBlur={onHandleBlur}
              placeholder='●●●●●●●●'
              type='password'
              value={password}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
          )}

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant='contained' type='submit' fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} variant='contained' fullWidth onClick={onGoogleSignIn} >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

        </Grid>

        <Grid container direction='row' justifyContent='end'>
          <Link component={RouterLink} color='inherit' to='/auth/register'>
            Create a new account!
          </Link>
        </Grid>

      </form>
    </Auth>


  )
}
export default Login