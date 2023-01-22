import { Box,Typography,Container,Grid } from '@mui/material'
import Image from 'next/image'

export default function About() {
  return <Box sx={{ width: '100%', textAlign: 'center' }}>
    <Box sx={{ backgroundColor: 'lightGrey.main', padding: '75px 0px' }}>
      <Container maxWidth='lg' disableGutters={true} sx={{ padding: '0px 15px 50px' }}>
        <Image src='/images/TravelImage.png' alt='Travel Image' height='100' width='300' />
        <Typography variant='h6' sx={{ paddingTop: '20px' }}>
          Hello, I'm Julian! I grew up in Pennsylvania, but I currently reside in 
          Omaha, Nebraska.
        </Typography>
      </Container>
    </Box>
    <Box sx={{ backgroundColor: 'secondary.main', padding: '25px 0px' }}>
      <Container maxWidth='lg' disableGutters={true} sx={{ padding: '50px 15px' }}>
        <Typography variant='h6' sx={{ padding: { xs: '0px 0px 50px', md: '50px' } }}>
          I graduated from the University of Colorado Colorado Springs with a 
          bachelor's degree in computer engineering. I'm also pursuing my master's 
          in computer science at Georgia Tech.
        </Typography>
        <Image src='/images/GradCap.png' alt='Graduation Cap Image' width='150' height='150' />
      </Container>
    </Box>
    <Box sx={{ backgroundColor: 'primary.main', padding: '50px 0px' }}>
      <Container maxWidth='lg' disableGutters={true} sx={{ padding: '50px 15px' }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ left: '50%', transform: 'translateX(-50%)', width: { xs: '100px', md: '150px' }, height: { xs: '100px', md: '150px' }, position: 'relative' }}>
              <Image src='/images/GameController.png' alt='Game Controller' fill />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ left: '50%', transform: 'translateX(-50%)', width: { xs: '100px', md: '150px' }, height: { xs: '100px', md: '150px' }, position: 'relative' }}>
              <Image src='/images/ClimbingImage.png' alt='Climbing Image' fill />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ left: '50%', transform: 'translateX(-50%)', width: { xs: '100px', md: '150px' }, height: { xs: '100px', md: '150px' }, position: 'relative' }}>
              <Image src='/images/FitnessImage.png' alt='Fitness Image' fill />
            </Box>
          </Grid>
        </Grid>
        <Typography variant='h6' sx={{ padding: { xs: '50px 0px 0px', md: '75px 50px 0px' } }}>
          I enjoy indoor rock climbing, fitness, and video games. My free time 
          is spent working on computer projects. My passions are learning and 
          creation.
        </Typography>
      </Container>
    </Box>
  </Box>
}