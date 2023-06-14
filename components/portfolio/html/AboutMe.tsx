import Box, { BoxProps } from '@mui/material/Box'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import ProgressBar from './ProgressBar'

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

const Title = styled(Typography)<TypographyProps>(() => ({
  variant: 'h3',
  fontWeight: '700',
  fontSize: '1.5rem',
  lineHeight: '1.8',
  marginTop: '64px'
}))

const Content = styled(Typography)<TypographyProps>(() => ({
  variant: 'body1',
  fontSize: '1.25rem',
  lineHeight: '2',
  marginTop: '18px'
}))

export default function AboutMe(props: {
  background: string
}): JSX.Element {
  return <Box
    component='div'
    className='about-me'
    sx={{
      width: {
        xs: '100%',
        sm: '50%'
      },
      padding: '1000px 4%',
      margin: 0,
      backgroundColor: props.background,
      marginRight: 'auto',
      borderTopRightRadius: '700px 700px',
      overflow: 'hidden',
      transition: 'background-color 0.5s, color 0.5s',
      position: 'relative',
      zIndex: '2'
    }}
  >
    <ProgressBar side='left' section='about-me' />
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
          About Me
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
        01
      </span>
    </Box>

    <Box component='div' sx={{ position: 'relative', padding: '20% 5%' }}>
      <Title>
        The Start Of My Journey
      </Title>
      <Content>
        I grew up in small town Pennsylvania. Although there wasn&apos;t much 
        engineering in my area, I was always fascinated with figuring out
        how things worked. I grew to love technology and taught myself how to 
        code in Java and create games in Unity. Upon graduating high school,
        I went to Colorado Springs to further my education. 
      </Content>
      <Title>
        Education
      </Title>
      <Content>
        I attended the University of Colorado to get my bachelors degree in 
        computer engineering. I learned about both the hardware and software 
        side of computers along with getting my minor in mathematics. While in 
        school, I was able to participate in two amazing internships with 
        Tesla and MITRE. I now reside in Omaha, NE with my beautiful wife and 
        will be starting my Masters in Computer Science this fall at Georgia 
        Tech.
      </Content>
      <Title>
        Hobbies
      </Title>
      <Content >
        In my free time, I like to rock climb, learn new coding techniques and 
        languages, and play games online with my friends and family. I&apos;ve 
        recently climbed my first v7! I finished a ThreeJS course which I used 
        to create the cool model on this page. And I&apos;m playing through 
        Divinity Original Sin 2 with a couple of my friends right now while 
        building my own DnD campaign with my younger brother.
      </Content>
    </Box>
  </Box>
}
