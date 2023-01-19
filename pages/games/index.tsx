import { Box, Container, Typography, Grid, Card, CardActionArea, CardContent, CardMedia } from '@mui/material'

export default function Games({ allGames }: any) {
  return <Box sx={{ backgroundColor: 'primary.main', width: '100%', padding: '100px 0px' }}>
    <Container maxWidth='lg' disableGutters={true} sx={{ textAlign: 'center', padding: '50px' }}>
      <Grid container spacing={4} sx={{ display: 'flex', alignItems: 'center' }}>
        {allGames.data.map((game: any, index: number) => (
          <Grid item xs={12} md={6} lg={4} sx={{ textAlign: 'center' }}>
            <Card raised sx={{ backgroundColor: 'lightGrey.main' }}>
              <CardActionArea href={'/games/' + index}>
                <CardMedia component='img' height='140' image={game.image} />
                <CardContent>
                  <Typography variant='h5' gutterBottom component='div'>
                    {game.name}
                  </Typography>
                  <Typography variant='body2'>
                    {game.description}
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
