import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { loginUserThunk } from "../redux/auth/actions";
import SignUp from './Signup';


export default function Login() {
  const dispatch = useDispatch();

   /** Load inital stores/page const */
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  /** Func for toggling display of password */
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  /** Login button */
  const login = (e) => {
    e.preventDefault()
    dispatch(loginUserThunk(email, password));
  };

  return (
      <div className='login_box d-flex'>
        <Form className='justify-content-center'>
          <h5>Log in</h5>
          <hr className="under-line text-center" />
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group>

          <div className="pass-wrapper">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type={passwordShown ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
              <VisibilityOffOutlinedIcon
                onClick={togglePassword}
                className='show_password' />
            </Form.Group>
          </div>

          <div className='d-flex justify-content-center'>

            <Stack gap={3}>
              <Button className="mx-1 mt-3 buttonOne" type="submit" onClick={(e) => { login(e) }}>
                Login
              </Button>

              <Button className="mx-1 buttonTwo" onClick={() => setModalShow(true)}>
                Sign Up
              </Button>
            </Stack>

          </div>
          <SignUp
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Form>
      </div>
  );
};