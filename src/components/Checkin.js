import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form'

import { setConnection } from "../redux/conection/actions";
import { emit, CHECKIN, ROOM } from "../redux/webSockets/actions";

import { Container, Row, Col } from "react-bootstrap";

import login_img from '../assets/7.png';

export default function Checkin() {
    const dispatch = useDispatch();

    /** Load inital stores */
    const appConfig = useSelector((state) => state.appConfigStore);

    /** Business and doctor drop down tab states for form submission */
    const [business, setBusiness] = useState('');
    const [doctor, setDoctor] = useState('');


    return (
        <>
            <Container>
                <Row>
                    <Col lg={5} sm={12}>
                        <Form >
                            <div className="login_box">
                                <Form.Group className="mb-3 " controlId="checkInForm">
                                    <Form.Label>Clinic</Form.Label>

                                    <Form.Select
                                        value={business}
                                        onChange={(e) => { setBusiness(e.target.value) }}>
                                        <option value="">Select Clinic</option>

                                        {appConfig ?
                                            appConfig.business.map(business =>
                                                <option
                                                    key={business.name}
                                                    value={business.id}>{business.name}
                                                </option>)
                                            :
                                            <option>Nothing Loaded</option>}
                                    </Form.Select>

                                    <Form.Label>Doctor</Form.Label>
                                    <Form.Select value={doctor} onChange={(e) => { setDoctor(e.target.value) }}>
                                        <option value="">Select Doctor</option>
                                        {appConfig.doctors.filter(doctor => doctor.business_id == business).map(doctor => <option key={doctor.l_name} value={doctor.id}>Dr. {doctor.l_name}</option>)}
                                    </Form.Select>

                                    <Button className='buttonOne my-5' onClick={() => {
                                        dispatch(setConnection({ business: business, doctor: doctor }));
                                        emit(CHECKIN, { business: business, doctor: doctor })
                                    }}>Check In</Button>
                                </Form.Group>
                            </div>
                        </Form>

                    </Col>
                    <Col lg={7} sm={12} className="login-right">
                        <img src={login_img} alt="login-img" className="login-img" />
                    </Col>
                </Row>
            </Container>
        </>
    );
};
