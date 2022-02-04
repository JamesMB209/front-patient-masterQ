import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";

import login_img from '../assets/6.png';
import Login from "../components/Login";

export default function LoginPage() {
  const navigate = useNavigate();

  /** Load inital states */
  const auth = useSelector((state) => state.authStore.isAuthenticated);

  /** Check logged in */
  useEffect(() => {
    if (auth === true) {
      navigate("/active");
    }
  }, [auth, navigate]);

  return (
    <Container>
      <Row>
        <Col lg={5} sm={12}>
          <Login />
        </Col>
        <Col lg={7} sm={12} className="login-right">
          <img src={login_img} alt="login-img" className="login-img" />
        </Col>
      </Row>
    </Container>
  );
}
