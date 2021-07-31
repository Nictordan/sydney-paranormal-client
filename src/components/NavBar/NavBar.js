import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import api from '../../config/api'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup
} from '@material-ui/core'

import NavBarMenu from './NavBarMenu/NavBarMenu'
import './NavBar.css'

const NavBar = () => {

  const [loggedIn, setLoggedIn] = useState(false)


  useEffect(() => {

    let token = JSON.parse(localStorage.getItem("token"))

    api.get('/api/get_user', {
        headers: {"Authorization" : `Bearer ${JSON.stringify(token)}`}
    })
    .then(res => {
  
        if (res.data['loggedin']) {
          setLoggedIn(true)
          console.log(loggedIn)
        }
        
    })

  }, [])




  const handleLogOut = () => {
    localStorage.clear()
    setLoggedIn(false)
  }



  

  const LogInOrOut = () => {

    if (loggedIn) {
      return (
        <ButtonGroup color="secondary" variant="contained">
          <Button onClick={handleLogOut}>

              Log Out

          </Button>
        </ButtonGroup>
      )
    } else {
      return(
        <ButtonGroup color="secondary" variant="contained">
        <Button>
          <Link to="/log-in">
              Log In
          </Link>
        </Button>

        <Button>
          <Link to="/sign-up">
              Sign Up
          </Link>
        </Button>
      </ButtonGroup>
      )
      
    }

  }



  return (
    <AppBar position="fixed">
      <Toolbar className="nav">
        {/* Hamburger Button  */}
        <NavBarMenu />

        {/* Title */}
        <Typography variant="h6">
            <Link to="/">
                Sydney Paranormal
            </Link>
        </Typography>

        {/* User login buttons */}


          <LogInOrOut/>



      </Toolbar>
    </AppBar>
  )
}

export default NavBar