import { Box } from '@mui/material'

export default function CustomizeScene(): JSX.Element {
  return <Box
    component='div'
    sx={{
      position: 'fixed',
      right: '0',
      height: '100px',
      width: '300px',
      backgroundColor: 'primary.main',
      borderRadius: '25px'
    }}
  >

  </Box>
}