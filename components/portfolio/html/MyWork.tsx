import Box, { BoxProps } from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const TitleArt = styled(Box)<BoxProps>(({ theme }) => ({
  component: 'div',
  position: 'absolute',
  top: '0px',
  display: 'block',
  width: '100%',
  maxWidth: '278px',
  height: '60px',
  border: `1px solid ${theme.palette.secondary.main}`,
  transform: 'skewY(-25deg)',
  transformOrigin: 'left'
}))

const Title = styled(Typography)<TypographyProps>(({ theme }) => ({
  variant: 'h3',
  fontWeight: '700',
  fontSize: '1.5rem',
  lineHeight: '1.8',
  marginTop: '64px'
}))

const Content = styled(Typography)<TypographyProps>(({ theme }) => ({
  variant: 'body1',
  fontSize: '1.25rem',
  lineHeight: '2',
  marginTop: '18px'
}))

export default function MyWork(): JSX.Element {
  return <Box
    component='div'
    sx={{
      width: '50%',
      padding: '1000px 4%',
      margin: 0,
      backgroundColor: 'primary.main',
      marginLeft: 'auto'
    }}
  >
    <Box
      component='div'
      sx={{
        position: 'relative',
        padding: '20% 5%',
        borderBottom: theme => `2px solid ${theme.palette.secondary.main}`,
        paddingBottom: '400px',
        color: 'secondary.main'
      }}
    >
      <Typography variant='h1' position='relative'>
        <span
          style={{
            display: 'block',
            fontWeight: '500',
            fontSize: '3rem',
            transformOrigin: 'left',
            transform: 'skewY(25deg)',
            zIndex: '5',
            textTransform: 'uppercase'
          }}
        >
          My Work
        </span>
        <TitleArt />
        <TitleArt sx={{ top: '80px' }} />
        <TitleArt sx={{ top: '80px', transform: 'skewY(25deg)', backgroundColor: 'secondary.main' }} />
      </Typography>
      <span
        style={{
          position: 'absolute',
          bottom: '15px',
          right: '0',
          fontSize: '2rem'
        }}
      >
        02
      </span>
    </Box>

    <Box component='div' sx={{ position: 'relative', padding: '20% 5%' }}>
      <Title>
        Lorem Ipsum
      </Title>
      <Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatibus, quod neque totam temporibus velit molestiae vitae et incidunt eos distinctio animi tenetur ut. Voluptatum, dolorem sunt. Totam, numquam exercitationem!
      </Content>
      <Title>
        Lorem Ipsum
      </Title>
      <Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatibus, quod neque totam temporibus velit molestiae vitae et incidunt eos distinctio animi tenetur ut. Voluptatum, dolorem sunt. Totam, numquam exercitationem!
      </Content>
      <Title>
        Lorem Ipsum
      </Title>
      <Content >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo voluptatibus, quod neque totam temporibus velit molestiae vitae et incidunt eos distinctio animi tenetur ut. Voluptatum, dolorem sunt. Totam, numquam exercitationem!
      </Content>
    </Box>
  </Box>
}