import React, { useState } from 'react'
import styled from 'styled-components'

import api from '../../config/api'

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`

export const SignUp = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleChange = (e) => {
    setUser({
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
    }
    console.log(userData)

    /*
     IMPORTANT: fix password_confirmation bug (it's returning null)
    */
    api.post('/api/signup', {
      headers: {
        "Content-Type": "application/json"
      },
      username: userData.username,
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.password_confirmation
    })
  }

  return (
    <>
      <h1>Sign Up page</h1><br />
      <SignUpForm onSubmit={handleSubmit}>
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
        
        {/* IMPORTANT: fix password_confirmation bug (it's returning null) */}
        <label htmlFor="password-confirmation">Password Confirmation:</label>
        <input 
          type="password" 
          name="password-confirmation" 
          id="password-confirmation" 
          value={user.password_confirmation} 
          onChange={handleChange} 
        />
        <br />
        <input type="submit" value="Sign Up" id="submit" />
      </SignUpForm>
    </>
  )
}
