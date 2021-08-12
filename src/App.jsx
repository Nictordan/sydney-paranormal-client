// React Components and Routing
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// STYLING
import './App.css';
// Material UI Styling
import { ThemeProvider } from '@material-ui/core/styles';

// COMPONENTS
import NavBar from './components/NavBar/NavBar';
// Routing Components
import { Home } from './components/Home/Home';
import { LogIn } from './components/LogIn/LogIn';
import { SignUp } from './components/SignUp/SignUp';

import { theme } from './styles/materialUITheme'

export const hello = "hello"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* ROUTING */}
        <Router>
          {/* NAVBAR */}
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
