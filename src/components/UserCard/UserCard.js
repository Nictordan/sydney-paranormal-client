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
            <Paper 
            center 
            className="UserCardPaper" 
            variant="outlined" 
            style={{ height: 180, width: '100%', marginBottom: 20 }}>
                <div className="UserCardPaperHeader" >
                    <IconButton>
                        <HomeIcon style={{ height: 25, width: 25 }} />
                    </IconButton>
                    <Typography variant="h5">Welcome, User</Typography>
                </div>
                <div>
                    <ButtonGroup variant="contained" color="primary">
                        <Button>Add Pin</Button>
                        <Button>Manage Pin</Button>
                    </ButtonGroup>
                </div>

            </Paper>
        </Grid>
    )
}

export default UserCard