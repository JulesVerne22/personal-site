import { Container } from '@mui/material'
import React from 'react'

export default function DefaultProfile() {
  return <Container maxWidth='lg' disableGutters={true} sx={{ textAlign: 'center', padding: '50px 0px', width: { xs: '400px', md: '800px' }, height: { xs: '400px', md: '800px' } }}>
    <iframe src="https://i.simmer.io/@JulesVerne22/pixelart-breakdown" style={{ width: '100%', height: '100%' }}>
    </iframe>
  </Container>
}