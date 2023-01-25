import { signIn } from 'next-auth/react'
import { Box,Container,Card,TextField,Typography,Button,Divider } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

export default function Signin () {
  const router = useRouter()
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: ''
  })

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    signIn('credentials', { redirect: false, email: credentials.email, password: credentials.password })
      .then((response) => {
        if (response) {
          if (response.ok) {
            router.push('/')
          } else {
            alert('Incorrect Email or Password')
          }
        } else {
          alert('Failed to login')
        }
      })
  }

  return <Box sx={{ backgroundColor: 'primary.main', width: '100%', height: '1440px' }}>
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
        <Box component='form' onSubmit={(event) => handleSubmit(event)} sx={{ padding: '10px 0px 30px', '& .MuiTextField-root': { width: '30ch' } }} autoComplete='off'>
          <TextField variant='filled' margin='dense' required fullWidth id='email' label='Email Address' name='email' autoComplete='email' autoFocus size='small'
            onChange={(event) => setCredentials({ ...credentials, email: event.target.value})} sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }} />
          <TextField variant='filled' margin='dense' required fullWidth id='password' label='Password' name='password' type='password' autoComplete='current-password' size='small'
            onChange={(event) => setCredentials({ ...credentials, password: event.target.value})} sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }} />
          <Button type='submit' variant='contained' sx={{ marginTop: 1, width: '50%', backgroundColor: 'lightGrey.main' }} >
            <Typography variant='button'>
              Enter
            </Typography>
          </Button>
        </Box>
      </Card>
    </Container>
  </Box>
}
