import React from 'react'
import { AppBar,Toolbar,Stack,Link,Container,IconButton,Drawer,Box,keyframes,Divider,Menu,MenuItem,ListItemIcon } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import LoginIcon from '@mui/icons-material/Login'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import LogoutIcon from '@mui/icons-material/Logout'
import { useSession,signIn,signOut } from 'next-auth/react'
import PersonIcon from '@mui/icons-material/Person'
import { imageContext } from './Layout'

export default function Navbar(): JSX.Element {
  const pages = ['Home', 'Games', 'About']

  const { image } = React.useContext(imageContext)
  const [imageData, setImageData] = React.useState<null | any>(null)
  const { data: session } = useSession()
  const [drawerState, setDrawerState] = React.useState<boolean>(false)
  const [drawerHeight, setDrawerHeight] = React.useState<number>(500)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  React.useEffect(() => {
    fetch('/api/getImage')
      .then((res) => res.json())
      .then((newData) => {
        setImageData(newData)
      })
  }, [image])

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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
      setDrawerState(open)
    }

  const swirlInFwd = keyframes`
    0% {
      -webkit-transform: rotate(-540deg) scale(0);
              transform: rotate(-540deg) scale(0);
      opacity: 0;
    }
    100% {
      -webkit-transform: rotate(0) scale(1);
              transform: rotate(0) scale(1);
      opacity: 1;
    }
  `

  const NewMenuIcon = styled(MenuIcon)(() => ({
    position: 'absolute',
    animation: `${swirlInFwd} 0.5s ease-out 1 ${drawerState ? 'reverse' : 'forward'} both`
  }))

  const NewCloseIcon = styled(CloseIcon)(() => ({
    postiion: 'absolute',
    animation: `${swirlInFwd} 0.5s ease-out 1 ${drawerState ? 'forward' : 'reverse'} both`
  }))

  let profileImage: undefined | string

  if(imageData && imageData.status === 'ok') {
    profileImage = imageData.data as string
  } else if (session) {
    profileImage = session!.user?.image as string
  } else {
    profileImage = undefined
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='static' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '50px',
            width: '100%'
          }}
        >
          <Toolbar variant='dense' disableGutters={true} sx={{ width: '100%' }}>
            <Stack
              direction='row'
              spacing={8}
              justifyContent='center'
              alignItems='center'
              sx={{
                display: {xs: 'none', md: 'flex'},
                width: '100%'
              }}
            >
              <Link href='/' sx={{ display: 'flex' }}>
                <Image
                  src='/images/JulianJLogo.png'
                  alt='Logo Image'
                  width='30'
                  height='30'
                  style={{ filter: 'invert(1)' }}
                />
              </Link>
              {pages.map((page, index) => {
                return <Link
                  key={index + '-topBar-link'}
                  underline='none'
                  href={'/' + (page !== 'Home' ? page.toLowerCase() : '')}
                  color='inherit'
                >
                  {page}
                </Link>
              })}
              <IconButton onClick={handleMenuClick} size='small'>
                <Avatar sx={{ backgroundColor: 'lightGrey.main' }} alt='profile' src={profileImage} />
              </IconButton>
            </Stack>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                display: {xs: 'flex', md: 'none'},
                width: '100%'
              }}
            >
              <IconButton
                size='large'
                onClick={toggleDrawer(!drawerState)}
                color='inherit'
                sx={{ position: 'relative' }}
              >
                <NewMenuIcon />
                <NewCloseIcon />
              </IconButton>
              <Link href='/' sx={{ display: 'flex', mr: 1 }}>
                <Image
                  src='/images/JulianJLogo.png'
                  alt='Logo Image'
                  width='30'
                  height='30'
                  style={{ filter: 'invert(1)' }}
                />
              </Link>
              <IconButton onClick={handleMenuClick} size='small'>
                <Avatar sx={{ backgroundColor: 'lightGrey.main' }} alt='profile' src={profileImage} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor='top' open={drawerState} onClose={toggleDrawer(false)} hideBackdrop={true} sx={{ zIndex: '1' }}>
        <Box
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          sx={{ width: '100%', height: drawerHeight + 'px' }}
        >
          <Stack spacing={2} alignItems='center'>
            <Toolbar variant='dense' />
            {pages.map((page, index) => {
              return <React.Fragment key={index + '-drawer-fragment'}>
                <Link
                  key={index + '-drawer-link'}
                  underline='none'
                  href={'/' + (page !== 'Home' ? page.toLowerCase() : '')}
                  color='inherit'
                  sx={{ width: '90%' }}
                >
                  {page}
                </Link>
                <Divider
                  key={index + '-drawer-divider'}
                  variant='middle'
                  sx={{ backgroundColor: 'inherit', width: '90%' }}
                />
              </React.Fragment>
            })}
          </Stack>
        </Box>
      </Drawer>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {!session ? <Box>
            <MenuItem onClick={() => signIn()}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LoginIcon fontSize='small' />
              </ListItemIcon>
              Login
            </MenuItem>
            <MenuItem component='a' href='/auth/register'>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <BorderColorIcon fontSize='small' />
              </ListItemIcon>
              Register
            </MenuItem>
          </Box>
          :
          <Box>
            <MenuItem component='a' href='/profile'>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <PersonIcon fontSize='small' />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => signOut()}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                <LogoutIcon fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Box>
        }
      </Menu>
    </Box>
  )
}
