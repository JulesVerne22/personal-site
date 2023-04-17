import { Box,Container,CircularProgress,Avatar,Typography,Grid,TextField,Button,Badge,Dialog,DialogTitle,DialogContent,Snackbar,Collapse } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSession } from 'next-auth/react'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { imageContext } from '../../components/Layout'
import type { AlertColor } from '@mui/material'

const images: string[] = [
  'CartoonRobot.png',
  'OrangeTRex.png',
  'PottedPlant.png',
  'PurpleFlower.png',
  'Rocket.png',
  'Coffee.png',
  'GreenTrike.png',
  'BlueShark.png',
  'PurpleSlug.png',
  'Strawberry.png',
  'BlueLongneckDino.png',
  'GreyOwl.png'
]

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

export default function Profile() {
  const { image: currentImage, setImage } = React.useContext(imageContext)
  const [open, setOpen] = React.useState<boolean>(false)
  const [imageData, setImageData] = React.useState<null | any>(null)
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const { data: session, status } = useSession({ required: true, onUnauthenticated() {
    window.location.href = '/auth/signin'
  }})
  const [newPassword, setNewPassword] = React.useState<string>('')
  const [openAlert, setOpenAlert] = React.useState<boolean>(false)
  const [error, setError] = React.useState<{status: AlertColor, message: string}>({ status: 'success', message: '' })

  function handleCloseAlert (event?: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') {
      return
    }

    setOpenAlert(false)
  }

  React.useEffect(() => {
    setLoading(true)
    fetch('/api/getImage')
    .then((res) => res.json())
      .then((newData) => {
        setImageData(newData)
        setLoading(false)
      })
    }, [currentImage])
    
  let profileImage: undefined | string
  let credsProvider: boolean = true
  
  if(imageData && imageData.status === 'ok') {
    profileImage = imageData.data as string
    credsProvider = true
  } else if (session) {
    profileImage = session!.user?.image as string
    credsProvider = false
  } else {
    profileImage = undefined
    credsProvider = false
  }
  
  if (status === 'loading' || isLoading) {
    return <Box
      sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        height: '1440px'
      }}
    >
      <Container
        maxWidth='lg'
        disableGutters={true}
        sx={{
          textAlign: 'center'
        }}
      >
        <Box sx={{ paddingTop: '50px' }}>
          <CircularProgress color='secondary' />
        </Box>
      </Container>
    </Box>
  }
  
  function handleClickOpen () {
    setOpen(true)
  }

  async function changePhoto (image: string) {
    const imageChangeResult = await fetch('/api/changeProfilePicture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image
      })
    })

    const jsonImageResult = await imageChangeResult.json()

    if (imageChangeResult.ok) {
      setImage('')
    } else {
      setError({ status: 'error', message: `${jsonImageResult.error}` })
      setOpenAlert(true)
    }
  }
  
  function handleClose (value: string) {
    setOpen(false)
    setImage(value)

    if (value !== '') {
      changePhoto(value)
    }
  }

  async function handleChangePassword (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const plainTextPassword = newPassword

    const passwordChangeResult = await fetch('/api/changePassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plainTextPassword
      })
    })

    const jsonPasswordResult = await passwordChangeResult.json()

    if (passwordChangeResult.ok) {
      document.getElementById('new-password')?.blur()
      setNewPassword('')
      setError({ status: 'success', message: 'Password successfully changed.' })
      setOpenAlert(true)
    } else {
      setError({ status: 'error', message: `${jsonPasswordResult.error}` })
      setOpenAlert(true)
    }
  }

  return <Box sx={{ backgroundColor: 'primary.main', width: '100%'}}>
    <Container maxWidth='lg' disableGutters={true}>
      <Grid
        container 
        sx={{
          display: 'flex',
          paddingTop: '50px',
          textAlign: 'center'
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          { credsProvider ?
            <Badge
              onClick={() => handleClickOpen()}
              overlap="circular"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              badgeContent={
                <EditIcon
                  fontSize='large'
                  sx={{
                    backgroundColor: 'text.primary',
                    color: 'lightGrey.main',
                    borderRadius: '50%'
                  }}
                />
              }
            >
              <Avatar
                sx={{
                  width: '200px',
                  height: '200px'
                }}
                alt='profile'
                src={profileImage}
              />
            </Badge>
            :
            <Avatar
              sx={{
                width: '200px',
                height: '200px'
              }}
              alt='profile'
              src={profileImage}
            />
          }
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '25px'
          }}
        >
          <Typography variant='h3'>
            {session ? session!.user?.name : ''}
          </Typography>
        </Grid>
        { credsProvider ? <>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography variant='h5' sx={{ paddingTop: '30px' }}>
              Change Password {currentImage}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component='form'
              onSubmit={(event) => handleChangePassword(event)}
              sx={{
                padding: '10px 0px 50px',
                '& .MuiTextField-root': {
                  width: '30ch'
                }
              }}
              autoComplete='off'
            >
              <TextField
                variant='filled'
                margin='dense'
                required
                fullWidth
                id='new-password'
                label='New Password'
                name='new-password'
                type='password'
                autoComplete='off'
                size='small'
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                sx={{
                  input: {
                    color: 'text.secondary',
                    backgroundColor: 'text.primary'
                  }
                }}
              />
              <Box sx={{ width: '100%' }}>
                <Button
                  type='submit'
                  variant='contained'
                  sx={{
                    marginTop: 1,
                    width: '180px',
                    backgroundColor: 'lightGrey.main'
                  }}
                >
                  <Typography variant='button'>
                    Enter
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        </> : <></>}
      </Grid>
      <SimpleDialog
        selectedValue={currentImage}
        open={open}
        onClose={handleClose}
      />
      <Snackbar
        open={openAlert}
        TransitionComponent={Collapse}
        autoHideDuration={5000}
        onClose={handleCloseAlert}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={error.status}
          sx={{ width: '100%' }}
        >
          {error.message}
        </Alert>
      </Snackbar>
    </Container>
  </Box>
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props

  function handleClose () {
    onClose(selectedValue)
  }

  function handleListItemClick (value: string) {
    onClose(value)
  }

  return <Dialog onClose={handleClose} open={open} scroll='paper'>
    <DialogTitle sx={{ textAlign: 'center' }}>Choose New Avatar</DialogTitle>
    <DialogContent sx={{ height: { xs: '200px' } }}>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '0px',
          paddingBottom: '5px'
        }}
      >
        {images.map((image, index) => (
          <Grid item key={`${image}-${index}`}>
            <Button
              onClick={() => handleListItemClick('images/profilePictures/' + image)}
              key={index + '-' + image}
              sx={{ margin: '5px' }}
            >
              <Avatar
                src={'images/profilePictures/' + image}
                sx={{ width: '65px', height: '65px' }}
              />
            </Button>
          </Grid>
        ))}
      </Grid>
    </DialogContent>
  </Dialog>
}
