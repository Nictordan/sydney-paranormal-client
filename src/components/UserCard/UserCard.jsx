import React, { useState, useEffect } from 'react'
import HomeIcon from '@material-ui/icons/Home';
import {
  Grid,
  Paper,
  Button,
  IconButton,
  ButtonGroup,
  Typography,
} from '@material-ui/core';

import './UserCard.css';
import api from '../../config/api';
import PinModal from '../CreatePin/PinModal';

const UserCard = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false)

  const handleCreatePin = () => {
    setShowModal(prevState => !prevState)
  }

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/api/get_user', {
        headers: { 'Authorization': `Bearer ${JSON.stringify(token)}` },
      })
      .then((res) => {
        if (res.data['loggedin']) {
          setUserName(res.data['user_name']);
          setUserId(res.data['user_id']);
        }
      });
  }, []);

  const Name = () => {
    if (userName === '') {
      return null;
    } else {
      return (
        <Typography variant="h5">
          {`Welcome,  @${userName}`}
        </Typography>
      ); 
    }
  };

  return (
    <Grid className="UserCard" item xs={11}>
      <Paper
        className="UserCardPaper"
        variant="outlined"
        style={{ height: 180, width: '100%', marginBottom: 20 }}
      >
        <div className="UserCardPaperHeader">
          <IconButton>
            <HomeIcon style={{ height: 25, width: 25 }} />
          </IconButton>
          <Name />
        </div>
        <div>
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={handleCreatePin}>Add Pin</Button>
            <Button>Manage Pins</Button>

            <PinModal showModal={showModal} setShowModal={setShowModal}/>
          </ButtonGroup>
        </div>
      </Paper>
    </Grid>
  );
};

export default UserCard;
