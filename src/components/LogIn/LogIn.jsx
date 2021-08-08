import './LogIn.css'

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../config/api';
import { FormWrapper } from '../../styles/FormWrapper';

import {
  TextField,
  Typography,
  Button,
} from '@material-ui/core';

export const LogIn = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        email: user.email,
        password: user.password,
      })
      .then((resp) => {
        console.log(resp.data.token);
        localStorage.setItem('token', JSON.stringify(resp.data.token));
      });

    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Typography variant="h2" color="secondary">
        Log In Page
      </Typography>
      <br />

      <FormWrapper onSubmit={handleSubmit}>

        <TextField
          className="textfield"
          variant="filled"
          label="Email"
          placeholder="name@example.com"
          color="secondary"
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />

        <br />

        <TextField
          className="textfield"
          variant="filled"
          label="Password"
          placeholder="name@example.com"
          color="secondary"
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />

        <br />

        <Button type="submit" value="Log In" id="submit" variant="contained" color="secondary" >Log In</Button>
      </FormWrapper>
    </>
  );
};
