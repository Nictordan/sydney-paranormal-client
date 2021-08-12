import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

import './ParanormalMap.css';
import CreatePinForm from '../CreatePin/CreatePinForm';

import MapSetup from './MapSetup';

const ParanormalMap = () => {
  return (
    <Grid item xs={11}>
      <Paper style={{ width: '100%' }}>
        <Typography variant="h5">Paranormal Activities</Typography>
        <CreatePinForm />
        <MapSetup />
      </Paper>
    </Grid>
  );
};

export default ParanormalMap;
