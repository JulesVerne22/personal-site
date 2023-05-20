import { Box } from '@mui/material'

export default function Color(props: {
  className?: string
  color: string
  onHandleChange: (color: string) => void
}): JSX.Element {
  const {color, onHandleChange, ...boxProps} = props

  const handleClick = () => {
    props.onHandleChange(props.color)
  }

  return <Box
    component='div'
    className={props.className}
    onClick={handleClick}
    height='25px'
    width='25px'
    margin='5px'
    sx={{
      backgroundColor: props.color,
      borderRadius: '25px',
      cursor: 'pointer',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 1px 5px'
    }}
  />
}