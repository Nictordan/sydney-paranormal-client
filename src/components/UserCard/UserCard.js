import './UserCard.css'

import {
    Grid,
    Paper,
    Button,
    IconButton,
    ButtonGroup,
    Typography
} from "@material-ui/core"

import HomeIcon from '@material-ui/icons/Home'

const UserCard = () => {
    return (
        <Grid className="UserCard" item xs={11}>
            <Paper center className="UserCardPaper" variant="outlined" style={{ height: 180, width: '100%', marginBottom: 50 }}>
                <div className="UserCardPaperHeader" >
                    <IconButton>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h4">Welcome, User</Typography>
                </div>
                <div>
                    <ButtonGroup variant="contained" color="secondary">
                        <Button>Add Pin</Button>
                        <Button>Manage Pin</Button>
                    </ButtonGroup>
                </div>

            </Paper>
        </Grid>
    )
}

export default UserCard