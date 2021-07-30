// React Components
import { useEffect } from 'react';

// MATERIAL-UI
// Material UI Buttons
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
// Material UI Icons
// import SaveIcon from '@material-ui/icons/Save'
// import DeleteIcon from '@material-ui/icons/Delete'
// import TextField from '@material-ui/core/TextField'
// Material UI Responsive Design
// import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
// Material UI Navigation
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// Material UI Typography
import Typography from '@material-ui/core/Typography'

// STYLING
import './App.css';
// Material UI Styling
import {
  // makeStyles,
  ThemeProvider,
  // createMuiTheme
} from '@material-ui/core/styles'


import api from './config/api'



const App = () => {

  useEffect(() => {
    api.get("/").then(res => console.log('[RES]', res))

    api.post('/api/signup', {
      headers: {
        "Content-Type": "application/json"
      },
      username: "hello2",
      email: "hello2@gmail.com",
      password: "123456",
      password_confirmation: "123456"
    })
  }, [])

  return (
    <ThemeProvider className="App">



      <div className="App">


        {/* Navbar */}
        <AppBar position="fixed">
          <Toolbar className="nav">

            {/* Hamburger Button  */}
            <IconButton>
              <MenuIcon />
            </IconButton>

            {/* Title */}
            <Typography variant="h6">
              Sydney Paranormal
            </Typography>

            <Button>
              Login
            </Button>

          </Toolbar>
        </AppBar>

        <Grid container spacing={2} justify="center">
          {/* Welcome User */}
          <Grid item xs={11}>
            <Paper variant="outlined" style={{ height: 200, width: '100%' }}>
              <Button>User Profile Link</Button>
              <Typography variant="h5">Welcome, User</Typography>
              <ButtonGroup variant="contained" color="secondary">
                <Button>Add Pin</Button>
                <Button>Manage Pin</Button>
              </ButtonGroup>
            </Paper>
          </Grid>

          {/* Stories You missed */}
          <Grid item xs={11}>
            <Paper style={{ width: '100%' }}>
              <Typography variant="h5">Stories</Typography>
              <Typography variant="h6">Story Title</Typography>
              <Typography variant="subtitle1">By: @username</Typography>
              <Typography variant="body1">Text goes here</Typography>
              <Button variant="contained" color="primary">Read More</Button>
            </Paper>
          </Grid>

          {/* Paranormal Activities */}
          <Grid item xs={11}>
            <Paper style={{ width: '100%' }}>
              <Typography variant="h5">Paranormal Activity</Typography>
            </Paper>
          </Grid>

        </Grid>
      </div>
    </ThemeProvider >
  )
}

export default App
