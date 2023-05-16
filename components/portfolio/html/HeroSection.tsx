import { Box, Typography } from '@mui/material'

export default function HeroSection(): JSX.Element {
  return <Box component='div' sx={{ width: '100vw', height: '100svh' }}>
    <Box
      component='div'
      sx={{
        position: 'relative',
        height: '100%',
        width: '80%',
        maxWidth: '1300px',
        margin: '0 auto'
      }}
    >
      <Box
        component='div'
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '0'
        }}
      >
        <Typography variant='h1' fontWeight='500' fontSize='5rem' textTransform='uppercase'>
          Julian Smith
        </Typography>
        <Typography variant='body1' fontSize='1.25rem'>
          Full Stack Developer | DevOps Engineer
        </Typography>
      </Box>
    </Box>
  </Box>
}