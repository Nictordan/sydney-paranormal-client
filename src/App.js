import { useEffect } from 'react';
import api from './config/api'

import './App.css';


const App = () => {
  useEffect(() => {
    api.get("/").then(res => console.log(res))
  }, [])

  return (
    <div className="App">
      Hello World
    </div>
  )
}

export default App
