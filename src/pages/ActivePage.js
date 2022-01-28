import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

import { checkin } from "../redux/queue/actions";

export default function ActivePage() {
  /** Load inital states */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const appConfig = useSelector((state) => state.appConfigStore);
  
  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);
  
  // const [checkedIn, setCheckedIn] = useState(false);
  const checkedIn = useSelector((state) => state.queueStatus.checkedIn);
  console.log(checkedIn)
  //form code.
  const [business, setBusiness] = useState(3);
  const [doctor, setDoctor] = useState(4);

  return (
    <>{checkedIn
      ? <p>active component</p>
      : 
      <Form className='row'>
          <Form.Group className="mb-3" controlId="checkInForm">
            <Form.Label>Business</Form.Label>
            <Form.Select value={business} onChange={(e) => { setBusiness(e.target.value)}}>
              {appConfig.business.map(business => <option key={business.name} value={business.id}>{business.name}</option>)}
            </Form.Select>
            <Form.Label>Doctor</Form.Label>
            <Form.Select value={doctor} onChange={(e) => { setDoctor(e.target.value) }}>
            {appConfig.doctors.filter(doctor => doctor.business_id == business).map(doctor => <option value={doctor.id}>Dr: {doctor.l_name}</option>)}
            </Form.Select>
          </Form.Group>
          <Button onClick={()=> {dispatch(checkin)}}>Check In</Button>
        </Form>
    }</>
  );
}