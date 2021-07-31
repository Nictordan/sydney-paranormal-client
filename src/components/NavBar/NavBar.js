import { Link } from 'react-router-dom'

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

      </Toolbar>
    </AppBar>
  )
}

export default NavBar