import './SignUp.css'

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../config/api';
import { FormWrapper } from '../../styles/FormWrapper';

import {
  TextField,
  Typography,
  Button
} from '@material-ui/core'

export const SignUp = () => {
  const [redirect, setRedirect] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/api/signup', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      username: user.username,
      email: user.email,
      password: user.password,
      password_confirmation: user.passwordConfirmation,
    });
    setRedirect(true);

    console.log('[SIGN UP]', user);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Typography variant="h2" color="secondary">
        Sign Up
      </Typography>
      <br />

      <FormWrapper onSubmit={handleSubmit}>
        {/* USERNAME */}
        <TextField
          className="textfield"
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
          label="Username"
          variant="filled"
          color="secondary"
        />
        <br />
        {/* EMAIL */}
        <TextField
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          className="textfield"
          label="Email"
          variant="filled"
          color="secondary"
          placeholder="name@example.com"
        />
        <br />
        {/* PASSWORD */}
        <TextField
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          className="textfield"
          label="Password"
          variant="filled"
          color="secondary"
        />
        <br />
        {/* PASSWORD CONFIRMATION */}
        <TextField
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          value={user.passwordConfirmation}
          onChange={handleChange}
          className="textfield"
          label="Confirm Password"
          variant="filled"
          color="secondary"
        />
        <br />
        <Button type="submit" value="Sign Up" id="submit" variant="contained" color="secondary">Sign Up</Button>
      </FormWrapper>
    </>
  );
};
