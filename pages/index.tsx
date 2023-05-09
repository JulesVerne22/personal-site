import { Typography,Container,Box,Grid } from '@mui/material'
import Image from 'next/image'

export default function Home() {
  return <Box component='div' sx={{ width: '100%' }}>
    <Box
      component='div'
      sx={{
        backgroundColor: 'secondary.main',
        padding: '25px 0px'
      }}
    >
      <Container maxWidth='lg' disableGutters={true}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: '50px 15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: 'center' }}
          >
            <Image
              src='/images/HomePageProfile.png'
              alt='Home Page Profile Image'
              width={300}
              height={300}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left'
              },
              padding: '10px'
            }}
          >
            <Typography variant='h2'>
              I&apos;m Julian!
            </Typography>
            <Typography
              variant='h4'
              sx={{
                paddingTop: {
                  xs: '20px',
                  md: '0px'
                }
              }}
            >
              Welcome to my digital hub
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box
      component='div'
      sx={{
        backgroundColor: 'primary.main',
        padding: '50px 0px'
      }}
    >
      <Container maxWidth='lg' disableGutters={true}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: '50px 15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: {
                xs: 'center',
                md: 'right'
              },
              padding: '10px'
            }}
          >
            <Typography
              variant='h5'
              sx={{
                paddingLeft: {
                  md: '150px'
                },
                paddingBottom: {
                  xs: '50px',
                  md: '0px'
                }
              }}
            >
              This is where I get to experiment with new technologies
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ textAlign: 'center' }}
          >
            <video
              autoPlay
              muted
              loop
              disableRemotePlayback
              playsInline
            >
              <source
                src='/videos/ComputerImage.mp4'
                type='video/mp4'
              />
            </video>
          </Grid>
        </Grid>
      </Container>
    </Box>
    <Box
      component='div'
      sx={{
        backgroundColor: 'lightGrey.main',
        padding: '150px 0px'
      }}
    >
      <Container maxWidth='lg' disableGutters={true}>
        <Grid
          container
          spacing={2}
          sx={{
            padding: '50px 15px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ textAlign: 'center' }}
          >
            <Typography variant='h5'>
              Please visit my other pages using the navigation bar. 
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
}
