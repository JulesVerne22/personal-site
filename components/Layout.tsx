import Navbar from './Navbar'
import Footer from './Footer'
import { PropsWithChildren } from 'react'
import { Container, Box } from '@mui/material'
import React from 'react'

export const imageContext = React.createContext({ image: '', setImage: (img: string) => {} })

export default function Layout ( props: PropsWithChildren ): JSX.Element {
  const [image, setImage] = React.useState<string>('')

  return (
    <imageContext.Provider value={{ image, setImage }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Navbar />
        <Container
          maxWidth={false}
          disableGutters={true}
          sx={{
            display: 'flex',
            flex: '1 0 auto',
            justifyContent: 'center',
            width: '100%',
            p: 0
          }}
        >
          {props.children}
        </Container>
        <Footer />
      </Box>
    </imageContext.Provider>
  )
}
