import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import { Home } from './components/Home';
import { Navbar } from './components/Navbar';
import { SignUp } from './components/SignUp';


const App = () => {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>

    </Router>
  )
}

export default App
