import Navbar from './Navbar'
import { PropsWithChildren } from 'react'
import { Container } from '@mui/material'

export default function Layout ( props: PropsWithChildren ): JSX.Element {
  return (
    <>
      <Navbar />
      <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        {props.children}
      </Container>
    </>
  )
}
