import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import login_img from '../assets/7.png';

import { token } from "../redux/webSockets/actions";


export default function BookingPage() {
  const navigate = useNavigate();

  /** Load initial stores/page const */
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const appConfig = useSelector((state) => state.appConfigStore);

  /** Business and doctor drop down tab states for form submission */
  const [business, setBusiness] = useState("");
  const [doctor, setDoctor] = useState("");
  const [time, setTime] = useState("");
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);

  /** Booking button func - quick and dirty */
  const makeBooking = () => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_SERVER}/booking/submit`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        businessID: business,
        doctorID: doctor,
        dateTime: time,
      }
    })
      .then((res) => {
        setBookingSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={5} sm={12}>
          <div className="login_box">
            {bookingSubmitted === false
              ?
              <Form >
                <Form.Group className="mb-3 " controlId="checkInForm">
                  <Form.Label>Clinic</Form.Label>

                  {/* Business */}
                  <Form.Select
                    value={business}
                    onChange={(e) => { setBusiness(e.target.value) }}>
                    <option value="">Select Clinic</option>
                    {appConfig.business.length > 0
                      ? appConfig.business.map(business =>
                        <option
                          key={business.name}
                          value={business.id}>{business.name}
                        </option>)
                      : <option value="">Loading ...</option>}
                  </Form.Select>

                  {/* Doctor */}
                  <Form.Label>Doctor</Form.Label>
                  <Form.Select value={doctor} onChange={(e) => { setDoctor(e.target.value) }}>
                    <option value="">Select Doctor</option>
                    {appConfig.doctors.filter(doctor => doctor.business_id.toString() === business).map(doctor => <option key={doctor.l_name} value={doctor.id}>Dr. {doctor.l_name}</option>)}
                  </Form.Select>

                  {/* Date/Time Slot */}
                  <Form.Group controlId="validationDob"
                    className="my-2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="datetime-local"
                      step="900"
                      value={time}
                      onChange={(e) => { setTime(e.target.value) }}
                      required />
                  </Form.Group>

                  <Button className='buttonOne my-5' onClick={makeBooking}>Make Booking</Button>
                </Form.Group>
              </Form>
              : 
              <p>Thank you, Booking has been confirmed</p>
            }

          </div>
        </Col>

        <Col lg={7} sm={12} className="login-right">
          <img src={login_img} alt="login-img" className="login-img" />
        </Col>

      </Row>
    </Container>
  );
}
