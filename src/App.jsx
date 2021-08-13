// React Components and Routing
import React, { useReducer } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

import api from './api/api';

//REDUCER
import initialState from './data/initialState'
import paranormalReducer from './reducers/paranormalReducer'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// STYLING
import './App.css';

// Material UI Styling
import { ThemeProvider } from '@material-ui/core/styles';

// COMPONENTS
import NavBar from './components/NavBar/NavBar';
// Routing Components
import { Home } from './components/Home/Home';
import { LogIn } from './components/LogIn/LogIn';
import { SignUp } from './components/SignUp/SignUp';
import Pin from './components/Pin/Pin';

import { theme } from './styles/materialUITheme'

export const hello = "hello"

const App = () => {
  const [store, dispatch] = useReducer(
    paranormalReducer,
    initialState
  )

  const [refreshApp, setRefreshApp] = useState(true)

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('token'));

    api
      .get('/api/get_user', {
        headers: { Authorization: `Bearer ${JSON.stringify(token)}` },
      })
      .then((res) => {
        if (res.data['loggedin']) {
          console.log(res)
          setUserId(res.data['user_id']);
        }
      });
  }, []);

  

  if (refreshApp) {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {/* ROUTING */}
          <Router>
            {/* NAVBAR */}
            <NavBar setRefreshApp={setRefreshApp}/>
            <Switch>
              <Route path="/" exact >
                <Home store={store} dispatch={dispatch} />
              </Route>
              <Route path="/login" component={LogIn} />
              <Route path="/signup" component={SignUp} />
              <Route path={"/pins"} >
                <Pin userId={userId} store={store} dispatch={dispatch} />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    );
  } else {
    return null
  }
};

export default App;
