import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { signupThunk } from '../redux/auth/actions';

import { InputGroup, Form, Button, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function SignUp(props) {
  const dispatch = useDispatch();

  /** Load initial stores/page const */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hkid, setHkid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [drugAllergies, setDrugAllergies] = useState("");

  //input validation
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      signUp();
    }

    setValidated(true);
  };

  //show / hide password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };



  const signUp = () => {
    let patient = {
      firstName: firstName,
      lastName: lastName,
      hkid: hkid,
      email: email,
      password: password,
      gender: gender,
      dob: dob,
      phone: phone,
      drugAllergies: drugAllergies,
    }
    dispatch(signupThunk(patient));
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h3 id="contained-modal-title-vcenter">
          Sign Up
        </h3>
      </Modal.Header>

      <Modal.Body>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}>
          <Row>

            <Form.Group as={Col} md="6" controlId="validationCustom01"
              className="my-2">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02"
              className="my-2">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => { setLastName(e.target.value) }}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" className="my-2" controlId="validationGender">
              <Form.Label>Gender</Form.Label>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} value={gender} className="my-3">
                  <Form.Check
                    inline
                    label="Female"
                    name="group1"
                    onClick={() => { setGender("female") }}
                    type={type}
                    id={`inline-${type}-1`}
                  />
                  <Form.Check
                    inline
                    label="Male"
                    name="group1"
                    onClick={() => { setGender("male") }}
                    type={type}
                    id={`inline-${type}-2`}
                  />
                </div>
              ))}
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustomUsername"
              className="my-2">
              <Form.Label>HKID</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  required
                  placeholder="M1234561"
                  value={hkid}
                  maxLength="8"
                  onChange={(e) => { setHkid(e.target.value) }}
                />
                <Form.Control.Feedback type="invalid">
                  Please input HKID number without the bracket
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group as={Col} md="12" controlId="validationCustom03"
            className="my-1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder="example@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </Form.Group>

          <div className="pass-wrapper">
            <Form.Group as={Col} md="12" controlId="validationCustom04"
              className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                placeholder="Password"
                maxLength="20"
                minLength="8"
                type={passwordShown ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} />
              <VisibilityOffOutlinedIcon
                onClick={togglePassword}
                className='show_password' />
              <Form.Control.Feedback type="invalid">
                Please enter password
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long.
          </Form.Text>

          {/* DOB */}
          <Form.Group controlId="validationDob"
            className="my-2">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              value={dob}
              onChange={(e) => { setDob(e.target.value) }}
              required />
            <Form.Control.Feedback type="invalid">
              Please enter your date of birth
            </Form.Control.Feedback>
          </Form.Group>

          {/* Phone */}
          <Form.Group
            controlId="validationPhone"
            className="my-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value) }}
              required />
            <Form.Control.Feedback type="invalid">
              Please enter your phone number
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="my-2 mb-4">
            <Form.Label>Drug Allergies</Form.Label>
            <Form.Control
              type="text"
              value={drugAllergies}
              onChange={(e) => { setDrugAllergies(e.target.value) }}
            />
          </Form.Group>

          <Button
            className="mx-1 buttonOne align-self-end"
            type="submit"
          > Sign Up
          </Button>

          <Button
            onClick={props.onHide} variant="secondary">Close</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}