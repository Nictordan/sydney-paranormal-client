import './NavBar.css'

import { 
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button
 } from '@material-ui/core'

 import MenuIcon from '@material-ui/icons/Menu'

const NavBar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar className="nav">

                {/* Hamburger Button  */}
                <IconButton>
                    <MenuIcon />
                </IconButton>

                {/* Title */}
                <Typography variant="h6">
                    Sydney Paranormal
                </Typography>

                <Button>
                    Login
                </Button>

            </Toolbar>
        </AppBar>
    )
}

export default NavBar