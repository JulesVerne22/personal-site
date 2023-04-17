import { Box,Container,Card,TextField,Typography,Button,Divider,Snackbar,Collapse,InputAdornment,IconButton } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Image from 'next/image'
import React from 'react'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function Signin () {
  const [credentials, setCredentials] = React.useState<any>({
    name: '',
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
    const name = credentials.name
    const email = credentials.email
    const plainTextPassword = credentials.password

    const result = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        plainTextPassword
      })
    })

    const jsonResult = await result.json()

    if (result.ok) {
      window.location.href = '/auth/signin'
    } else {
      setError(jsonResult.error)
      setOpenAlert(true)
    }
  }

  return <Box sx={{ backgroundColor: 'primary.main', width: '100%' }}>
    <Container
      maxWidth='lg'
      disableGutters={true}
      sx={{
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card
        raised
        sx={{
          backgroundColor: 'secondary.main',
          width: '400px',
          marginTop: '50px',
          marginBottom: '50px'
        }}
      >
        <Image
          src='/images/JulianJLogo.png'
          alt='Logo Image'
          width='70'
          height='70'
          style={{
            filter: 'invert(1)',
            marginTop: '20px',
            transform: 'rotate(-90deg)'
          }}
        />
        <Typography variant='h4' sx={{ padding: '0px 15px 15px' }}>Register</Typography>
        <Divider variant='middle' />
        <Box
          component='form'
          autoComplete='off'
          onSubmit={(event) => handleSubmit(event)}
          sx={{
            padding: '10px 0px 30px',
            '& .MuiTextField-root': {
              width: '30ch',
              backgroundColor: 'text.primary'
            },
            '& .MuiInputBase-root': {
              backgroundColor: 'text.primary'
            },
            '& .MuiFilledInput-root:hover': {
              backgroundColor: 'text.primary'
            }, 
            '& .MuiFilledInput-root.Mui-focused': {
              backgroundColor: 'text.primary'
              }
            }}
        >
          <TextField
            variant='filled'
            margin='dense'
            required
            fullWidth
            id='name'
            label='Full Name'
            name='name'
            autoFocus size='small'
            autoComplete='off'
            value={credentials.name}
            onChange={(event) => setCredentials({ ...credentials, name: event.target.value})}
            sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }}
          />
          <TextField
            variant='filled'
            margin='dense'
            required
            fullWidth
            id='email'
            label='Email'
            name='email'
            type='email'
            size='small'
            autoComplete='off'
            value={credentials.email}
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value})}
            sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }}
          />
          <TextField
            variant='filled'
            margin='dense'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            size='small'
            autoComplete='off'
            value={credentials.password}
            onChange={(event) => setCredentials({ ...credentials, password: event.target.value})}
            sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }} 
            InputProps={{ endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ backgroundColor: 'text.primary' }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ) }}
          />
          <Button
            type='submit'
            variant='contained'
            sx={{
              marginTop: 1,
              width: '50%',
              backgroundColor: 'lightGrey.main'
            }}
          >
            <Typography variant='button'>
              Enter
            </Typography>
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={openAlert}
        TransitionComponent={Collapse}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  </Box>
}
