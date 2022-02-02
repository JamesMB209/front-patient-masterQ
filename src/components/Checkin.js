import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import socketIOClient from 'socket.io-client';

import { updatePatient } from "../redux/queue/actions";

export default function Checkin(props) {
    const dispatch = useDispatch();

    /** Load inital stores */
    const appConfig = useSelector((state) => state.appConfigStore);

    /** Business and doctor drop down tab states */
    const [business, setBusiness] = useState('');
    const [doctor, setDoctor] = useState('');

    console.log(props)

    return (
        <Form className='row'>
            <Form.Group className="mb-3" controlId="checkInForm">
                <Form.Label>Business</Form.Label>
                <Form.Select value={business} onChange={(e) => { setBusiness(e.target.value) }}>
                    <option value="">Select Business</option>
                    {appConfig.business.map(business => <option key={business.name} value={business.id}>{business.name}</option>)}
                </Form.Select>
                <Form.Label>Doctor</Form.Label>
                <Form.Select value={doctor} onChange={(e) => { setDoctor(e.target.value) }}>
                    <option value="">Select Doctor</option>
                    {appConfig.doctors.filter(doctor => doctor.business_id == business).map(doctor => <option key={doctor.l_name} value={doctor.id}>Dr: {doctor.l_name}</option>)}
                </Form.Select>
            </Form.Group>
            <Button onClick={() => { props.cb(business, doctor) }}>Check In</Button>
        </Form>
    );
};
