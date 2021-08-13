import { Typography, Grid, Paper } from '@material-ui/core';
import './About.css';

export const About = () => {
  return (
    <Grid className="About" item xs={11}>
      <Typography variant="h2">How to use this app</Typography>
      <Paper
        className="About-paper"
        variant="outlined"
        style={{ width: '100%', marginBottom: 20 }}
      >
        <Typography variant="h5">What is Sydney Paranormal?</Typography>
        <Typography variant="body1">
          Sydney Paranormal is an app for users to post paranormal sightings and
          keep track of those occurrences. It's easy and simple to use and
          accessible to anyone who wants to embrace their inner witch hunter and
          join in on investigations or start their own.
        </Typography>
        <br />

        <Typography variant="h5">Make an Account</Typography>
        <Typography variant="body1">
          First point of order is to make an account. You can do this by
          clicking the sign up button in the top right corner and filling in the
          form. You will need an email to do this.
        </Typography>
        <br />

        <Typography variant="h5">Create a Pin</Typography>
        <Typography variant="body1">
          Creating a pin is easy. All you need to do is select the 'Post A Pin'
          button above the map and fill out the form. You will need a valid
          address for this to work. Just add the details on your paranormal
          sighting with a title for your Pin and a description and you're good
          to go.
        </Typography>
        <br />

        <Typography variant="h5">Add Notes to your Pin</Typography>
        <Typography variant="body1">
          Once your Pin is created, you can add notes to expand with more
          extensive details on your sighting. People can add their own Notes and
          details to your pin if they have something to add.
        </Typography>
        <br />

        <Typography variant="h5">
          Add to the discussion on your notes or someone elses
        </Typography>
        <Typography variant="body1">
          Finally in addition to creating a Pin for your sighting and Notes to
          that Pin. Users are able to leave comments within the Notes
          themselves.
        </Typography>
        <br />
      </Paper>
    </Grid>
  );
};
