import { Typography, Container, Box, Grid } from '@mui/material'
import CopyrightIcon from '@mui/icons-material/Copyright'
import Image from 'next/image'

export default function Home() {
  return <Box sx={{ width: '100%' }}>
    <Box sx={{ backgroundColor: 'secondary.main', padding: '25px 0px' }}>
      <Container maxWidth='lg' disableGutters={true}>
        <Grid container spacing={2} sx={{ padding: '50px 15px', display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <Image src='/HomePageProfile.png' alt='Home Page Profile Image' width={300} height={300} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' }, padding: '10px' }}>
            <Typography variant='h2'>
              I'm Julian!
            </Typography>
            <Typography variant='h4' sx={{ paddingTop: { xs: '20px', md: '0px' } }}>
              Welcome to my digital hub
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box sx={{ backgroundColor: 'primary.main', padding: '50px 0px' }}>
      <Container maxWidth='lg' disableGutters={true}>
        <Grid container spacing={2} sx={{ padding: '50px 15px', display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' }, padding: '10px' }}>
            <Typography variant='h5' sx={{ paddingLeft: { md: '150px' }, paddingBottom: { xs: '50px', md: '0px' } }}>
              This is where I get to experiment with new technologies
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <video autoPlay muted loop disableRemotePlayback playsInline>
              <source src='/ComputerImage.mp4' type='video/mp4' />
            </video>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box sx={{ backgroundColor: 'lightGrey.main', padding: '150px 0px' }}>
      <Container maxWidth='lg' disableGutters={true}>
        <Grid container spacing={2} sx={{ padding: '50px 15px', display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant='h5'>
              Please visit my other pages using the navigation bar. 
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box sx={{ backgroundColor: 'text.primary' }}>
      <Container maxWidth='lg' disableGutters={true}>
        <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography paragraph sx={{ color: 'text.secondary', mb: '4px' }}>
              Julian Smith
              <br/>
              All rights reserved. Copyright <CopyrightIcon fontSize='inherit' /> 2023
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
}
