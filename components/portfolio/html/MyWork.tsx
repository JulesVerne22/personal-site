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

export default function MyWork(props: {
  background: string
}): JSX.Element {
  return <Box
    component='div'
    className='my-work'
    sx={{
      width: {
        xs: '100%',
        sm: '50%'
      },
      padding: '1000px 4%',
      margin: 0,
      backgroundColor: props.background,
      marginLeft: 'auto',
      borderTopLeftRadius: '700px 700px',
      overflow: 'hidden',
      transition: 'background-color 0.5s, color 0.5s',
      position: 'relative',
      zIndex: '2'
    }}
  >
    <ProgressBar side='right' section='my-work' />
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
        Tesla Intern
      </Title>
      <Content>
        At Tesla, I was a silicon validation engineer. However, my team needed 
        a devops engineer, so that is what I became. They needed to convert 
        their test suite to be more scalable and portable, so I taught myself 
        Docker and Ansible to containerize their suite and automatically 
        deploy/update/destroy it on as many systems as necessary. I also wrote 
        several tests in Python that were added to the testing suite.
      </Content>
      <Title>
        MITRE Internship
      </Title>
      <Content>
        MITRE hired me as a software engineering intern, and allowed me to 
        increase my knowledge of devops. I created a portable development 
        platform in AWS EKS using Terraform as IaC. The platform offered teams 
        automatically generated accounts, Kubernetes environments, access 
        to a pipelining tool called Concourse with custom made templates, and a 
        monitoring solution called Grafana. Upon completing my internship, my 
        prototype was put into production and is still being run today.
      </Content>
      <Title>
        MITRE Full-Time
      </Title>
      <Content >
        MITRE was so impressed with my performance as an intern that they hired 
        me directly into a Level 2 position as an intermediate software engineer. 
        My next projects allowed me to actually use the platform I had created 
        and develop several internal websites to be hosted on Kubernetes. I 
        developed 3 React applications. An internal documentation search that 
        indexed multiple documentation sites into a single searchable registry, 
        a schema site for searching and viewing schema data in a tree format, 
        and a landing site for my division that showcased our products and 
        services.
      </Content>
    </Box>
  </Box>
}
