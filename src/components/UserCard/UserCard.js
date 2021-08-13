import './UserCard.css';

import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

import api from '../../api/api';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';

const UserCard = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/api/get_user', {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
      })
      .then((res) => {
        if (res.data['loggedin']) {
          setUserName(res.data['user_name']);
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

  Modal.setAppElement('body');
  return (
    <>
      <Grid className="UserCard" item xs={11}>
        <Paper
          className="UserCardPaper"
          variant="outlined"
          style={{ height: 180, width: '100%', marginBottom: 20 }}
        >
          <div className="UserCardPaperHeader">
            <Name />
            {/* <Typography variant="h5">Welcome, User</Typography> */}
          </div>
        </Paper>
      </Grid> 
    </>
  );
};

export default UserCard;
