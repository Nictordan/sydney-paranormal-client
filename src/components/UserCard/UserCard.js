import './UserCard.css'

import { 
    Grid,
    Paper,
    Button,
    ButtonGroup,
    Typography } from "@material-ui/core"

const UserCard = () => {
    return (
        <Grid className="UserCard" item xs={11}>
            <Paper variant="outlined" style={{ height: 200, width: '100%' }}>
                <Button>User Profile Link</Button>
                <Typography variant="h5">Welcome, User</Typography>
                <ButtonGroup variant="contained" color="secondary">
                    <Button>Add Pin</Button>
                    <Button>Manage Pin</Button>
                </ButtonGroup>
            </Paper>
        </Grid>
    )
}

export default UserCard