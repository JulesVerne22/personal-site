import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const FlexBox = styled(Box)<BoxProps>(({theme}) => ({
  display: 'flex',
  height: '600px',
  width: '100%'
}))

export default function Home() {
  return <Box sx={{ width: '100%' }}>
    <FlexBox sx={{ backgroundColor: 'secondary.dark' }}>
    
    </FlexBox>
    <FlexBox sx={{ backgroundColor: 'primary.dark' }}>
    
    </FlexBox>
    <FlexBox sx={{ backgroundColor: 'secondary.dark' }}>
    
    </FlexBox>
  </Box>
}
