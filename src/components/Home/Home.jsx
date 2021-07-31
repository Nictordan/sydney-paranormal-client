import React from 'react'

// import api from '../../config/api'

// MATERIAL-UI
import { Grid } from '@material-ui/core'

// COMPONENTS
import UserCard from '../UserCard/UserCard'
import StoriesCard from '../StoriesCard/StoriesCard';
import ParanormalMap from '../ParanormalMap/ParanormalMap';

export const Home = () => {

  // api.get('/user', {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   withCredentials: true
  // })
  
  // const jwt = localStorage.getItem('token')
  
  // const incoming = {
  //   headers: {
  //     Authorization: `Bearer ${jwt}`
  //   }
  // }

  // api.get('/', incoming).then(res => console.log(res))

  return (
    <Grid container justifyContent="center">
      {/* Welcome User */}
      <UserCard />
      {/* Stories You missed */}
      <StoriesCard />
      {/* Paranormal Activities */}
      <ParanormalMap />
    </Grid>
  )
}