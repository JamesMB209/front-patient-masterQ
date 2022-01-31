import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Routes, BrowserRouter, Link, Route, Navigate } from 'react-router-dom';
import { logoutNowThunk } from './redux/auth/actions';
import { Navbar, NavItem, Container } from 'react-bootstrap';
import axios from 'axios';

import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ActivePage from './pages/ActivePage';
import { loadConfigThunk } from './redux/appConfig/actions';

function App() {
  const dispatch = useDispatch();

  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);

  useEffect(() => {
    console.log("I ran once")
  })
  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(loadConfigThunk())
      console.log("how many times do i go")

    }
  });
  

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark">
          <Container>
            <NavItem>
              <Link to="/booking">Online Booking</Link>
            </NavItem>
            <NavItem>
              <Link to="/active">Checkin</Link>
            </NavItem>
            {isAuthenticated
              ? (
                <NavItem>
                  <Link to="/login" onClick={() => dispatch(logoutNowThunk())}>Logout</Link>
                </NavItem>
              )
              : (
                <NavItem>
                  <Link to="/login">Login/SignUp</Link>
                </NavItem>
              )}
          </Container>
        </Navbar>

        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/active" element={<ActivePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
