import './UserCard.css';

import {
  Grid,
  Paper,
  Button,
  IconButton,
  ButtonGroup,
  Typography,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';

import api from '../../config/api';
import { useState } from 'react';
import { useEffect } from 'react';

const UserCard = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();

    let token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/api/get_user', {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
      })
      .then((res) => {
        if (res.data['loggedin']) {
          api
            .post('/api/pins', {
              user_id: userId,
              // this title of 'bunyip' is just a placeholder until pin input is sorted
              title: 'bunyip',
            })
            .then((res) => {
              console.log(res.data);
            });
        }
      });
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/api/get_user', {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
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
      return <Typography variant="h5">{'Welcome, ' + userName}</Typography>;
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
          {/* <Typography variant="h5">Welcome, User</Typography> */}
        </div>
        <div>
          <ButtonGroup variant="contained" color="primary">
            <Button onClick={handleClick}>Add Pin</Button>
            <Button>Manage Pin</Button>
          </ButtonGroup>
        </div>
      </Paper>
    </Grid>
  );
};

export default UserCard;
