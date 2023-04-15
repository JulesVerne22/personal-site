import { signIn } from 'next-auth/react'
import { Box,Container,Card,TextField,Typography,Button,Divider,Snackbar,Collapse,InputAdornment,IconButton } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import Image from 'next/image'
import React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function Signin () {
  const [credentials, setCredentials] = React.useState<any>({
    email: '',
    password: ''
  })
  const [openAlert, setOpenAlert] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  function handleClose (event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    signIn('credentials', { redirect: false, email: credentials.email, password: credentials.password })
      .then((response) => {
        if (response) {
          if (response.ok) {
            window.location.href = '/'
          } else {
            const errorRes = JSON.parse(response.error || '{ error: "Not working" }')
            setError(errorRes.error)
            setOpenAlert(true)
          }
        } else {
          setError('Failed to login')
          setOpenAlert(true)
        }
      })
  }

  return <Box sx={{ backgroundColor: 'primary.main', width: '100%' }}>
    <Container maxWidth='lg' disableGutters={true} sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <Card raised sx={{ backgroundColor: 'secondary.main', width: '400px', marginTop: '50px' }}>
        <Image src='/images/JulianJLogo.png' alt='Logo Image' width='70' height='70' style={{ filter: 'invert(1)', marginTop: '20px', transform: 'rotate(-90deg)' }} />
        <Typography variant='h4' sx={{ padding: '0px 15px 15px' }}>Login</Typography>
        <Button variant='contained' onClick={() => signIn('google')} sx={{ marginTop: 3, marginBottom: 2, width: '50%', backgroundColor: 'text.primary' }}>
          <Typography variant='button' sx={{ marginRight: '5px', color: 'text.secondary' }}>
            Sign in with
          </Typography>
          <Image src='/images/GoogleLogo.png' alt='Google Logo' width='17' height='17' />
        </Button>
        <Divider variant='middle'>
          <Typography variant='body2'>OR</Typography>
        </Divider>
        <Box component='form' onSubmit={(event) => handleSubmit(event)} sx={{ padding: '10px 0px 30px', '& .MuiTextField-root': { width: '30ch', backgroundColor: 'text.primary' },
          '& .MuiInputBase-root': { backgroundColor: 'text.primary' }, '& .MuiFilledInput-root:hover': { backgroundColor: 'text.primary' }, 
          '& .MuiFilledInput-root.Mui-focused': { backgroundColor: 'text.primary' } }} autoComplete='off'>
          <TextField variant='filled' margin='dense' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus size='small'
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value})} sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }} />
          <TextField variant='filled' margin='dense' required fullWidth id='password' label='Password' name='password' type={showPassword ? 'text' : 'password'} autoComplete='off' size='small'
            onChange={(event) => setCredentials({ ...credentials, password: event.target.value})} sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }} 
            InputProps={{ endAdornment: (
              <InputAdornment position="end" sx={{ backgroundColor: 'text.primary' }}>
                <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ backgroundColor: 'text.primary' }}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) }} />
          <Button type='submit' variant='contained' sx={{ marginTop: 1, width: '50%', backgroundColor: 'lightGrey.main' }} >
            <Typography variant='button'>
              Enter
            </Typography>
          </Button>
        </Box>
      </Card>
      <Snackbar open={openAlert} TransitionComponent={Collapse} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  </Box>
}
