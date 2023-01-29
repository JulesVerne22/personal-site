import Navbar from './Navbar'
import Footer from './Footer'
import { PropsWithChildren } from 'react'
import { Container } from '@mui/material'
import React from 'react'

export const imageContext = React.createContext({ image: '', setImage: (img: string) => {} })

export default function Layout ( props: PropsWithChildren ): JSX.Element {
  const [image, setImage] = React.useState<string>('')

  return (
    <imageContext.Provider value={{ image, setImage }}>
      <Navbar />
      <Container maxWidth={false} disableGutters={true} sx={{ display: 'flex', justifyContent: 'center', width: '100%', p: 0 }}>
        {props.children}
      </Container>
      <Footer />
    </imageContext.Provider>
  )
}
