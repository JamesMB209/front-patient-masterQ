import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, BrowserRouter, Link, Route, } from 'react-router-dom';

import { Navbar, Container, Nav } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ActivePage from './pages/ActivePage';

import { loadConfigThunk } from './redux/appConfig/actions';
import { logoutNowThunk } from './redux/auth/actions';
import { token } from './redux/webSockets/actions';

import logo from './assets/logo-white.png'

import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


export default function App() {
  const dispatch = useDispatch();

  /** Load initial stores/page const */
  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(loadConfigThunk())
    }
  }, [dispatch, isAuthenticated]);

  /** Catch if the app was loaded without a valid token causing socket to not connect after login */
  useEffect(() => {
    if (isAuthenticated === true && token === null) {
      window.location.reload()
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar className="navbar" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">
              <img
                src={logo}
                width="85"
                height="85"
                className="d-inline-block align-top ms-5"
                alt="logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="m-auto my-2 my-lg-0"
                style={{ maxHeight: '120px' }}
                navbarScroll
              >

                <Link to="/booking" className="nav-item mx-4"> <LaptopChromebookOutlinedIcon className="mx-2" />
                  Online Booking</Link>

                <Link to="/active" className="nav-item mx-4"> <FactCheckOutlinedIcon className="mx-2" />
                  Check-in</Link>

                {isAuthenticated
                  ? (
                    <Link to="/login"
                      onClick={() => dispatch(logoutNowThunk())} className="nav-item mx-4">
                      <LogoutOutlinedIcon className="mx-2" />
                      Logout</Link>
                  )
                  : (
                    <Link to="/login" className="nav-item mx-4">
                      <LogoutOutlinedIcon className="mx-2" />
                      Login / SignUp</Link>

                  )}
              </Nav>
            </Navbar.Collapse>
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