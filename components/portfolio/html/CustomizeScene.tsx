import { Box } from '@mui/material'
import ModeSwitch from './customizationBar/ModeSwitch'
import LEDSelect from './customizationBar/LEDSelect'

export default function CustomizeScene(): JSX.Element {
  return <Box
    component='div'
    sx={{
      position: 'fixed',
      right: '1%',
      borderRadius: '25px',
      zIndex: '1'
    }}
  >
    <ModeSwitch />
    <LEDSelect />
  </Box>
}