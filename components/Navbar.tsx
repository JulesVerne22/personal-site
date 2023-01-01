import React from 'react'
import { AppBar,Toolbar,Stack,Link,Container,IconButton,Drawer,Box,Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'

export default function Navbar(): JSX.Element {
  const pages = ['Home', 'About', 'Profile']

  const [state, setState] = React.useState<boolean>(false)
  const [drawerHeight, setDrawerHeight] = React.useState<number>(500)

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setDrawerHeight(window.innerHeight)
      setState(open)
    }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='static' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'center', height: '50px', width: '100%' }}>
          <Toolbar variant='dense' disableGutters={true} sx={{ width: '100%' }}>
            <Stack direction='row' spacing={8} justifyContent='center' alignItems='center' sx={{ display: {xs: 'none', md: 'flex'}, width: '100%' }}>
              <Link href='/' sx={{ display: 'flex' }}>
                <Image src='/JulianJLogo.png' alt='Logo Image' width='30' height='30' className={styles.logo} />
              </Link>
              {pages.map((page) => {
                return <Link underline='none' href={'/' + (page !== 'Home' ? page.toLowerCase() : '')} color='inherit'>{page}</Link>
              })}
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ display: {xs: 'flex', md: 'none'}, width: '100%' }}>
              <IconButton size='large' onClick={toggleDrawer(!state)} color='inherit'>
                {state ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
              <Link href='/' sx={{ display: 'flex', mr: 1 }}>
                <Image src='/JulianJLogo.png' alt='Logo Image' width='30' height='30' className={styles.logo} />
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor='top' open={state} onClose={toggleDrawer(false)} hideBackdrop={true}>
        <Box role='presentation' onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} sx={{ width: '100%', height: drawerHeight + 'px' }}>
          <Stack spacing={2} alignItems='center' sx={{ width: '100%' }}>
            <Toolbar variant='dense' />
            {pages.map((page) => {
              return <Link underline='none' href={'/' + (page !== 'Home' ? page.toLowerCase() : '')} color='inherit'>{page}</Link>
            })}
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}