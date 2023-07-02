import { Box } from '@mui/material'
import ModeSwitch from './customizationBar/ModeSwitch'
import LEDSelect from './customizationBar/LEDSelect'

export default function CustomizeScene(): JSX.Element {
  return <Box
    component='div'
    className='customize-scene'
    sx={{
      opacity: 0,
      position: 'fixed',
      right: '1%',
      borderRadius: '25px',
      zIndex: '3'
    }}
  >
    <ModeSwitch />
    <LEDSelect />
  </Box>
}
