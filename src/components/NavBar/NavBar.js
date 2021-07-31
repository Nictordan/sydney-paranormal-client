import './NavBar.css'

import { Link } from 'react-router-dom'


import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core'

import NavBarMenu from './NavBarMenu/NavBarMenu'


const NavBar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar className="nav">


                {/* Hamburger Button  */}
                <NavBarMenu />

                {/* Title */}
                <Typography variant="h6">
                    Sydney Paranormal
                </Typography>

                <Link to="/sign-up">
                    <Button>
                        Sign Up
                    </Button>
                </Link>

                <Link to="/log-in">
                    <Button>
                        Login
                    </Button>
                </Link>


            </Toolbar>
        </AppBar>
    )
}

export default NavBar