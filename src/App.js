import React from 'react'
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component';
import SignUp from './components/signup.component';
import UserDetails from './components/userDetails'



function App() {
  return (
    <div className="App">
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Router>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />} />

            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
