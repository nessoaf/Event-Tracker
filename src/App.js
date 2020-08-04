import React, { useState, useEffect, Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import Calendar from './components/Calendar'
import EventsTemplate from './components/EventsTemplate'
import Favorites from './components/Favorites'
import Login from './components/Login'
import Profile from './components/Profile'
import Welcome from './components/Welcome'
import Navigation from './wrappers/Navigation'
import Register from './components/Register'
import Footer from './wrappers/Footer'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootswatch/dist/darkly/bootstrap.min.css'
import './App.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // get suer via jwt token to confirm user auth
  const user = localStorage.getItem('jwtToken')
  return <Route {...rest} render={(props) => (
    user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
  )} />
}

function App() {

  let [currentUser, setCurrentUser] = useState('')
  let [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    let token
    if (localStorage.getItem('jwtToken') === null) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'))
      setAuthToken(localStorage.jwtToken)
      setCurrentUser(token)
      setIsAuthenticated(true)
    }
  }, [])

  //Setting current user
  const nowCurrentUser = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
  }

  //Logging out
  let handleLogout = () => {
    if (localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken')
      setCurrentUser(null)
      setIsAuthenticated(false)
    }
  }

  return (
    <div className='error'>
      <Navigation component={Navigation} handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
      <div className="react-router-logic">
        <Switch>
          <Route path='/calendar' render={props => <Calendar {...props} user={currentUser} />} />
          <Route path='/login' render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} user={currentUser} /> } />
          <PrivateRoute path='/favorites' component={Favorites} user={currentUser} />
          <PrivateRoute path='/profile' component={Profile} user={currentUser} />
          <Route path='/register' component={Register} />
          <Route path='/eventstemplate' render= { props => <EventsTemplate {...props} nowCurrentUser={nowCurrentUser} user={currentUser} />} />
          <Route path='/' component={Welcome} />
        </Switch>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
