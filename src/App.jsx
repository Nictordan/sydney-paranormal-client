import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';
import api from './config/api'
import { Home } from './scenes/Home';
import { Navbar } from './scenes/Navbar';
import { SignUp } from './scenes/SignUp';


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
