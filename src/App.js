import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Routes, BrowserRouter, Link, Route, Navigate } from 'react-router-dom';
import { logoutNowThunk } from './redux/auth/actions';
import { Navbar, NavItem, Container } from 'react-bootstrap';
import axios from 'axios';

import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ActivePage from './pages/ActivePage';
import { loadConfigThunk } from './redux/appConfig/actions';

import logo from './assets/logo-white.png'

function App() {
  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
  const dispatch = useDispatch();
  const onPageLoad = () => dispatch(loadConfigThunk());
  // const [response, setResponse] = useState("");
  // useEffect(() => {
  //   const socket = socketIOClient(process.env.REACT_APP_API_SERVER, {transports: ['websocket']});
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });

  //   return () => socket.disconnect();
  // }, []);
  

  useEffect(() => {
    onPageLoad();
  }, []);

    return (
      <BrowserRouter>
        <div className="App">
          <Navbar className="navbar">
            <Container>
            <Navbar.Brand href="#home">
      <img
        src={logo}
        width="85"
        height="85"
        className="d-inline-block align-top"
        alt="logo"
      />
    </Navbar.Brand>

              <NavItem>
                <Link to="/booking" className="nav-item">Online Booking</Link>
              </NavItem>
              <NavItem>
                <Link to="/active" className="nav-item">Checkin</Link>
              </NavItem>
              {isAuthenticated 
              ? (
                <NavItem>
                  <Link to="/login" onClick={() => dispatch(logoutNowThunk())} className="nav-item">Logout</Link>
                </NavItem>
              )
              : (
                <NavItem>
                  <Link to="/login" className="nav-item">Login/SignUp</Link>
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
