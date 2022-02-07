import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, BrowserRouter, Link, Route, } from 'react-router-dom';

import { Navbar, NavItem, Container, Nav } from 'react-bootstrap';

import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import ActivePage from './pages/ActivePage';

import { loadConfigThunk } from './redux/appConfig/actions';
import { logoutNowThunk } from './redux/auth/actions';

import logo from './assets/logo-white.png'

import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

function App() {
  const dispatch = useDispatch();

  let isAuthenticated = useSelector((state) => state.authStore.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated === true) {
      dispatch(loadConfigThunk())
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
            
            <Nav.Link href="/booking" className="nav-item mx-4"> <LaptopChromebookOutlinedIcon className="mx-2"/>
              Online Booking</Nav.Link>

            <Nav.Link href="/active" className="nav-item mx-4"> <FactCheckOutlinedIcon className="mx-2"/>
              Checkin</Nav.Link>

            {isAuthenticated
              ? (
                <Nav.Link >
                  <Link to="/login" 
                  onClick={() => dispatch(logoutNowThunk())} className="nav-item mx-4">
                    <LogoutOutlinedIcon className="mx-2"/>
                    Logout</Link>
                </Nav.Link>
              )
              : (
                <Nav.Link >
                  <Link to="/login" className="nav-item mx-4">
                  <LogoutOutlinedIcon className="mx-2"/>
                  Login/SignUp</Link>
                </Nav.Link>
              )}

            {/* {isAuthenticated
              ? (
                  <Nav.Link 
                  href="/login" 
                  onClick={() => dispatch(logoutNowThunk())} className="nav-item mx-4"> <LogoutOutlinedIcon className="mx-2"/>
                    Logout</Nav.Link>
              )
              : (
                  <Nav.Link 
                  href="/login" 
                  className="nav-item"><LoginOutlinedIcon className="mx-2"/>
                    Login/SignUp</Nav.Link>
              )} */}
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

export default App;
