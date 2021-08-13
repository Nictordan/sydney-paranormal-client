import React, { useState } from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';

import './ParanormalMap.css';
import CreatePinForm from '../CreatePin/CreatePinForm';

import MapSetup from './MapSetup';

const ParanormalMap = (props) => {
  const { store, dispatch } = props;

  const [openForm, setOpenForm] = useState(false);

  const handleFormButton = () => {
    if (openForm === false) {
      setOpenForm(true);
    } else {
      setOpenForm(false);
    }
  };

  const renderForm = () => {
    if (openForm === false) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormButton}
          style={{ marginBottom: 50 }}
        >
          Post a pin
        </Button>
      );
    } else {
      return (
        <div className="map-container">
          <CreatePinForm />
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormButton}
          >
            Back
          </Button>
        </div>
      );
    }
  };

  return (
    <Grid item xs={11}>
      <Paper style={{ width: '100%' }}>
        <div className="map-container">
          <Typography className="paranormal-map-heading" variant="h5">
            Paranormal Activities
          </Typography>
          {renderForm()}
          <MapSetup store={store} dispatch={dispatch} />
        </div>
      </Paper>
    </Grid>
  );
};

export default ParanormalMap;
