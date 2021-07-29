import React, { useState } from 'react'
import styled from 'styled-components'

// import api from '../../config/api'

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 50%;
`

export const SignUp = () => {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setNewUser({
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
    }

    console.log(userData)
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
          value={newUser.username} 
          onChange={handleChange} 
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          value={newUser.email} 
          onChange={handleChange} 
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          value={newUser.password} 
          onChange={handleChange} 
        />
        <br />
        <input type="submit" value="Submit" id="submit" />
      </SignUpForm>
    </>
  )
}
