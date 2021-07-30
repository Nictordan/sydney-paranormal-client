// React Components
import { useEffect } from 'react';

// MATERIAL-UI
import { 
  Grid } from '@material-ui/core'

// STYLING
import './App.css';
// Material UI Styling
import {
  // makeStyles,
  ThemeProvider,
  // createMuiTheme
} from '@material-ui/core/styles'

// COMPONENTS
import UserCard from './components/UserCard/UserCard'
import StoriesCard from './components/StoriesCard/StoriesCard';
import ParanormalMap from './components/ParanormalMap/ParanormalMap';
import NavBar from './components/NavBar/NavBar';

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
    <ThemeProvider>
      <div className="App">
        {/* NAVBAR */}
        <NavBar />
        {/* COMPONENTS */}
        <Grid container justifyContent="center">
          {/* Welcome User */}
          <UserCard />
          {/* Stories You missed */}
          <StoriesCard />
          {/* Paranormal Activities */}
          <ParanormalMap/>
        </Grid>
      </div>
    </ThemeProvider >
  )
}

export default App
