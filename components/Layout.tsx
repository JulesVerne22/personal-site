import Navbar from './Navbar'
import { PropsWithChildren } from 'react'
import { Container } from '@mui/material'

export default function Layout ( props: PropsWithChildren ): JSX.Element {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} disableGutters={true} sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 0 }}>
        {props.children}
      </Container>
    </>
  )
}
