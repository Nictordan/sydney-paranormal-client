import {
    Grid,
    Paper,
    Typography,
    Button
} from '@material-ui/core'

const StoriesCard = () => {
    return (
        <Grid item xs={11}>
            <Paper style={{ width: '100%' }}>
                <Typography variant="h5">Stories</Typography>
                <Typography variant="h6">Story Title</Typography>
                <Typography variant="subtitle1">By: @username</Typography>
                <Typography variant="body1">Text goes here</Typography>
                <Button variant="contained" color="primary">Read More</Button>
            </Paper>
        </Grid>
    )
}

export default StoriesCard