import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketIOClient from 'socket.io-client';
import { Routes, BrowserRouter, Link, Route, Navigate } from 'react-router-dom';
import { logoutNowThunk } from './redux/auth/actions';
import { Navbar, NavItem, Container } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ActivePage from './pages/ActivePage';

function App() {
  // const [response, setResponse] = useState("");
  // useEffect(() => {
  //   const socket = socketIOClient(process.env.REACT_APP_API_SERVER, {transports: ['websocket']});
  //   socket.on("FromAPI", data => {
  //     setResponse(data);
  //   });

  //   return () => socket.disconnect();
  // }, []);
  
    let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);
    const dispatch = useDispatch();
  
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
