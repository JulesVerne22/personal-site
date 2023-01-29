import { Box,Container,Typography,Grid,Card,CardActionArea,CardContent,CardMedia } from '@mui/material'

export default function Games({ allGames }: any) {
  const descriptionLength = 215

  return <Box sx={{ backgroundColor: 'primary.main', width: '100%', height: '1440px' }}>
    <Container maxWidth='lg' disableGutters={true} sx={{ textAlign: 'center' }}>
      <Typography variant='h1' sx={{ padding: '50px 0px'}}>
        Games
      </Typography>
      <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center', paddingLeft: '25px', paddingRight: '25px' }}>
        {allGames.data.map((game: any, index: number) => (
          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: 'center' }}>
            <Card raised sx={{ backgroundColor: 'lightGrey.main' }}>
              <CardActionArea href={'/games/' + index} sx={{ minHeight: '300px', maxHeight: '300px', display: 'block' }}>
                <CardMedia component='img' height='140' image={game.image} />
                <CardContent>
                  <Typography variant='h5' gutterBottom component='div' sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                    {game.name}
                  </Typography>
                  <Typography variant='body2' sx={{ textAlign: 'left' }}>
                    {game.description.substring(0,game.description.length > descriptionLength ? descriptionLength : game.description.length - 1) 
                      + (game.description.length > descriptionLength ? '...' : '')}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
}

export async function getServerSideProps(context: any) {
  let res = await fetch(process.env.DOMAIN + '/api/games', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  let allGames = await res.json()

  return {
    props: { allGames }
  }
}
