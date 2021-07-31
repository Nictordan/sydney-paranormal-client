import './NavBar.css'

import { Link } from 'react-router-dom'


import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    ButtonGroup
} from '@material-ui/core'

import NavBarMenu from './NavBarMenu/NavBarMenu'


const NavBar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar className="nav">

                {/* Hamburger Button  */}
                <NavBarMenu />

                {/* Title */}
                <Link to="/">
                    <Typography variant="h6">
                        Sydney Paranormal
                    </Typography>
                </Link>

                <ButtonGroup>
                    <Link to="/sign-up">
                        <Button color="secondary" variant="contained">
                            Sign Up
                        </Button>
                    </Link>

                    <Link to="/log-in">
                        <Button color="secondary" variant="contained">
                            Login
                        </Button>
                    </Link>
                </ButtonGroup>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar