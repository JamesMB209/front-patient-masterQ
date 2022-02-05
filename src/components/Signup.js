import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { signupThunk } from '../redux/auth/actions';
import Form from 'react-bootstrap/Form'


export default function SignUp(props) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hkid, setHkid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [drugAllergies, setDrugAllergies] = useState("");

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
    console.log(patient);
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
        <Modal.Title id="contained-modal-title-vcenter">
          Sign Up
          - required *
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className='row'>
          <Form.Group className="mb-3" controlId="signUpForm">
            <Form.Label>First name*</Form.Label>
            <Form.Control 
            required 
            placeholder="Enter first name" 
            value={firstName} 
            onChange={(e) => { setFirstName(e.target.value) }} />

            <Form.Label>Last name*</Form.Label>
            <Form.Control 
            required
            placeholder="Enter last name" 
            value={lastName} 
            onChange={(e) => { setLastName(e.target.value) }} />

            <Form.Label>HKID*</Form.Label>
            <Form.Control 
            required
            placeholder="M1234561" 
            value={hkid} 
            onChange={(e) => { setHkid(e.target.value) }} />

            <Form.Label>Email*</Form.Label>
            <Form.Control 
            required
            placeholder="example@example.com" 
            value={email} 
            onChange={(e) => { setEmail(e.target.value) }} />

            <Form.Label>Password*</Form.Label>
            <Form.Control 
            required
            placeholder="Password" 
            value={password} 
            onChange={(e) => { setPassword(e.target.value) }} />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain letters and numbers, and
              must not contain spaces, special characters, or emoji.
            </Form.Text><br />

            {/* Gender */}
            <Form.Label>Gender</Form.Label>
            <Form.Select 
            value={gender} 
            onChange={(e) => { setGender(e.target.value) }}>
              <option value="">Choose gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
            {/* <Form.Control placeholder="Gender" value={gender} onChange={(e) => { setGender(e.target.value) }} /> */}

            {/* DOB */}
            <Form.Label>Date of birth</Form.Label>
            <Form.Control 
            type="date" 
            value={dob} 
            onChange={(e) => { setDob(e.target.value) }} />

            {/* Phone */}
            <Form.Label>Phone number</Form.Label>
            <Form.Control 
            value={phone} 
            onChange={(e) => { setPhone(e.target.value) }} />

            {/* Drug Allerges */}
            <Form.Label>Drug Allergies</Form.Label>
            <Form.Control 
            value={drugAllergies} 
            onChange={(e) => { setDrugAllergies(e.target.value) }} />

          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="mx-1 buttonOne" variant="primary" type="submit" onClick={(e) => {
          signUp();
          console.log("clicked")
          // props.onHide();
        }}>
          Sign Up
        </Button>
        <Button onClick={props.onHide} variant="secondary">Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
