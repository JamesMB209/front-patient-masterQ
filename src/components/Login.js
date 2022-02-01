// import FacebookLogin from "react-facebook-login";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUserThunk /** ,loginFacebookThunk */} from "../redux/auth/actions";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import SignUp from './Signup';



const Login = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();


  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const login = (e) => {
    e.preventDefault()
    dispatch(loginUserThunk(email, password));
  };
  

  // function componentClicked() {
  //   console.log("clicked");
  //   return null;
  // }

  // function responseFacebook(userInfo) {
  //   console.log("response", userInfo);
  //   if (userInfo.accessToken) {
  //     dispatch(loginFacebookThunk(userInfo));
  //   }
  //   return null;
  // }

  return (
   <>
    <div className='login_box d-flex'>
      <Form className='justify-content-center'>
        <h5>Log in</h5>
        <hr className="under-line text-center"/>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </Form.Group>

        <div className='d-flex justify-content-center'>

        <Stack gap={3}>
          <Button className="mx-1 mt-3 buttonOne"  type="submit" onClick={(e) => { login(e) }}>
            Login
          </Button>
          
          <Button className="mx-1 buttonTwo"  onClick={() => setModalShow(true)}>
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
   </>
  );
};

export default Login;