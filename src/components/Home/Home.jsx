import React from 'react';


// MATERIAL-UI
import { Grid } from '@material-ui/core';

// COMPONENTS

import UserCard from "../UserCard/UserCard";
import ParanormalMap from "../ParanormalMap/ParanormalMap";


export const Home = () => {
  return (
    <Grid container justifyContent="center">
      {/* Welcome User */}
      <UserCard />
      {/* Paranormal Activities */}
      <ParanormalMap />
    </Grid>
  );
};
