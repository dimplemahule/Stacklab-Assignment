import React from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component';
import SignUp from './components/signup.component';
import UserDetails from './components/userDetails'



function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">
      
          <Router>
            <Routes>
              <Route exact path="/" element={isLoggedIn == "true"?<UserDetails />:<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />

            </Routes>
          </Router>
        </div>
  );
}

export default App;
