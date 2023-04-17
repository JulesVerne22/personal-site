import { useRouter } from 'next/router'
import { Container, Box, Button } from '@mui/material'

export default function GameHandler() {
  const router = useRouter()
  const gameID = router.query.gameID as string

  return <Box
    sx={{
      backgroundColor: 'primary.main',
      width: '100%',
      textAlign: 'center'
    }}
  >
    {handleGame(gameID)}
    <Button
      variant='contained'
      href='/games'
      sx={{
        backgroundColor: 'secondary.main',
        '&:hover': {
          backgroundColor: 'secondary.dark'
        }
      }}
    >
      Return to Games
    </Button>
  </Box>
}

function handleGame(gameID: string): JSX.Element {
  switch (gameID) {
    case '0':
      return <Container disableGutters={true} maxWidth='lg' sx={{ textAlign: 'center', padding: '50px 0px', width: { xs: '100%', md: '800px' }, height: { xs: '400px', md: '600px' } }}>
          <iframe src="https://i.simmer.io/@JulesVerne22/pixelart-breakdown" style={{ width: '100%', height: '100%' }}>
          </iframe>
        </Container>
      default:
        return <></>
  }
}