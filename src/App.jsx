// React Components and Routing
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
// Routing Components
// import { Home } from './components/Home';
// import { LogIn } from './components/LogIn';
// import { SignUp } from './components/SignUp';

// API
import api from './config/api'

const App = () => {
  
  return (
//     <Router>
//       <Navbar />

//       <Switch>
//         <Route path="/log-in">
//           <LogIn />
//         </Route>
//         <Route path="/sign-up">
//           <SignUp />
//         </Route>
//         <Route path="/">
//           <Home />
//         </Route>
//       </Switch>
//     </Router>

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
    </ThemeProvider>
  )
}

export default App
