import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import api from '../../config/api';
import { FormWrapper } from '../../styles/FormWrapper';

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
      <h1>Log In page</h1>
      <br />

      <FormWrapper onSubmit={handleSubmit}>
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
        <input type="submit" value="Log In" id="submit" />
      </FormWrapper>
    </>
  );
};
