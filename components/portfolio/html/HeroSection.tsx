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
          bottom: {
            xs: '15%',
            sm: '30%'
          },
          left: '0',
          transition: 'color 2.5s'
        }}
      >
        <Typography variant='h1' fontWeight='500' fontSize='4.6rem' textTransform='uppercase'
          sx={{
            textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
          }}
        >
          Julian Smith
        </Typography>
        <Typography variant='body1' fontSize='1.25rem'
          sx={{
            textShadow: '1px 1px 0px rgba(0,0,0,0.2)'
          }}
        >
          Full Stack Developer | DevOps Engineer
        </Typography>
      </Box>
    </Box>
  </Box>
}