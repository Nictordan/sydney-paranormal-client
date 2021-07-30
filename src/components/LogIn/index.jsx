import React, { useState } from 'react'

import api from '../../config/api'
import { FormWrapper } from '../../styles/FormWrapper'

export const LogIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()

    api.post('/login', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      email: user.email,
      password: user.password
    })
  }

   return (
    <>
      <h1>Log In page</h1><br />

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
   )
}