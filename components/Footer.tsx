import { Box,Container,Grid,Typography } from '@mui/material'
import CopyrightIcon from '@mui/icons-material/Copyright'

export default function Footer() {
  return <Box
    component='div'
    sx={{
      flexShrink: '0',
      backgroundColor: 'text.primary',
      width: '100%'
    }}
  >
    <Container maxWidth='lg' disableGutters={true}>
      <Grid container spacing={0} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography paragraph sx={{ color: 'text.secondary', mb: '0' }}>
            Julian Smith
            <br/>
            All rights reserved. Copyright <CopyrightIcon fontSize='inherit' /> 2023
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
}