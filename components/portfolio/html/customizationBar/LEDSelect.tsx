import { Box, Typography } from '@mui/material'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { usePortfolioStore } from '../../../../stores/usePortfolio'
import Color from './Color'

export default function LEDSelect(): JSX.Element {
  const {ledColor, setLEDColor} = usePortfolioStore(state => ({
    ledColor: state.ledColor,
    setLEDColor: state.setLEDColor
  }))
  const colorDrawer = useRef<HTMLDivElement>(null!)

  const handleChangeColor = (color: string) => {
    setLEDColor(color)
    if(colorDrawer.current) {
      gsap.to(
        colorDrawer.current,
        {
          height: '0px',
          duration: '0.25'
        }
      )
    }
  }

  const handleDropDown = () => {
    if(colorDrawer.current) {
      gsap.to(
        colorDrawer.current,
        {
          height: '185px',
          duration: '0.25'
        }
      )
    }
  }

  return <Box
    component='div'
    sx={{
      display: 'flex',
      marginLeft: 'auto',
      marginRight: '20px',
      width: '35px',
      flexWrap: 'wrap',
      '& .color:hover': {
        scale: '1.1'
      }
    }}
  >
    {/* <Typography marginBottom='0px'>
      LEDs
    </Typography> */}
    <Box
      component='div'
      onClick={handleDropDown}
      height='25px'
      width='25px'
      margin='5px'
      marginTop='0px'
      sx={{
        backgroundColor: ledColor,
        borderRadius: '25px',
        cursor: 'pointer',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        '&:hover': {
          scale: '1.1'
        }
      }}
    />
    <Box
      ref={colorDrawer}
      component='div'
      overflow='hidden'
      sx={{
        height: '0px'
      }}
    >
      <Color
        className='color color-cyan'
        color='#00adb5'
        onHandleChange={handleChangeColor}
      />
      <Color
        className='color color-red'
        color='#cc0000'
        onHandleChange={handleChangeColor}
      />
      <Color
        className='color color-green'
        color='#00cc00'
        onHandleChange={handleChangeColor}
      />
      <Color
        className='color color-blue'
        color='#0000cc'
        onHandleChange={handleChangeColor}
      />
      <Color
        className='color color-purple'
        color='#cc00cc'
        onHandleChange={handleChangeColor}
      />
      <Color
        className='color color-white'
        color='#cccccc'
        onHandleChange={handleChangeColor}
      />
    </Box>
  </Box>
}