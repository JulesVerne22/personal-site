import { Box,Container,Card,TextField,Typography,Button,Divider } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

export default function Signin () {
  const router = useRouter()
  const [credentials, setCredentials] = React.useState({
    name: '',
    email: '',
    password: ''
  })

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
      router.push('/auth/signin')
    } else {
      alert(jsonResult.error)
    }
  }

  return <Box sx={{ backgroundColor: 'primary.main', width: '100%', height: '1440px' }}>
    <Container maxWidth='lg' disableGutters={true} sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
      <Card raised sx={{ backgroundColor: 'secondary.main', width: '400px', marginTop: '50px' }}>
        <Image src='/images/JulianJLogo.png' alt='Logo Image' width='70' height='70' style={{ filter: 'invert(1)', marginTop: '20px', transform: 'rotate(-90deg)' }} />
        <Typography variant='h4' sx={{ padding: '0px 15px 15px' }}>Register</Typography>
        <Divider variant='middle' />
        <Box component='form' onSubmit={(event) => handleSubmit(event)} sx={{ padding: '10px 0px 30px', '& .MuiTextField-root': { width: '30ch' } }} autoComplete='off'>
          <TextField variant='filled' margin='dense' required fullWidth id='name' label='Full Name' name='name' autoComplete='name' autoFocus size='small'
            onChange={(event) => setCredentials({ ...credentials, name: event.target.value})} sx={{ input: { color: 'text.secondary', backgroundColor: 'text.primary' } }} />
          <TextField variant='filled' margin='dense' required fullWidth id='email' label='Email' name='email' type='email' autoComplete='email' size='small'
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
