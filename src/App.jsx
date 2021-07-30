// React Components and Routing
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// STYLING
import './App.css';
// Material UI Styling
import {
  // makeStyles,
  ThemeProvider,
  // createMuiTheme
} from '@material-ui/core/styles'

// COMPONENTS
import NavBar from './components/NavBar/NavBar';
// Routing Components
import { Home } from './components/Home/Home';
import { LogIn } from './components/LogIn/LogIn';
import { SignUp } from './components/SignUp';

const App = () => {
  return (
    <ThemeProvider>
      <div className="App">
        {/* NAVBAR */}
        <NavBar />
        {/* ROUTING */}
        <Router>
          <Switch>
            <Route path="/log-in" component={LogIn} />
            <Route path="/sign-up" component= {SignUp} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
