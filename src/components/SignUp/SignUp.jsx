import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../config/api';
import { FormWrapper } from '../../styles/FormWrapper';

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
      <h1>Sign Up page</h1>
      <br />

      <FormWrapper onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={user.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={user.password}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
          value={user.passwordConfirmation}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Sign Up" id="submit" />
      </FormWrapper>
    </>
  );
};
