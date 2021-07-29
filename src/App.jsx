import { useEffect } from 'react';

import './App.css';
import api from './config/api'


const App = () => {

  useEffect(() => {
    api.get("/").then(res => console.log('[RES]', res))

    api.post('/api/signup', {
      headers: {
        "Content-Type": "application/json"
      },
      username: "hello2",
      email: "hello2@gmail.com",
      password: "123456",
      password_confirmation: "123456"
    })
  }, [])

  return (
    <div className="App">
      Hello World
    </div>
  )
}

export default App
