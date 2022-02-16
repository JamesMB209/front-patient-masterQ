import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Container, Row, Col } from "react-bootstrap";
import happyFace from "../assets/icons8-happy-32.png";
import indifferentFace from "../assets/icons8-confused-32.png";
import sadFace from "../assets/icons8-sad-32.png";

import { submitReviewThunk } from '../redux/patientObj/actions';

export default function Review() {
    const dispatch = useDispatch();

    /** Load initial stores/page const */
    const appointmentHistoryID = useSelector((state) => state.patientObjStore.appointmentHistoryID);
    const [score, setScore] = useState('2');
    const [review, setReview] = useState();
    const radios = [
        { name: 'happy', value: '3', img: happyFace },
        { name: 'indifferent', value: '2', img: indifferentFace },
        { name: 'sad', value: '1', img: sadFace },
    ];

    /** Submit button func */
    function submitForm() {
        dispatch(submitReviewThunk({
            appointmentHistoryID: appointmentHistoryID,
            score: score,
            review: review,
        }))
    }

    return (
        <Container >
            <Row className='justify-content-center'>
                <Col lg={5} sm={12}>
                    <div className='review_box'>
                        <Form className='justify-content-center'>
                            <h5 className='my-4'>Review</h5>
                            <hr className="under-line text-center" />

                            <Form.Group className="mb-3" controlId="formBasicSatisfaction">
                                <ButtonGroup className="m-3 mb-5 review_icon">
                                    {radios.map((radio, idx) => (
                                        <ToggleButton
                                            key={idx}
                                            id={`radio-${idx}`}
                                            type="radio"
                                            variant="secondary"
                                            name="radio"
                                            value={radio.value}
                                            checked={score === radio.value}
                                            onChange={(e) => setScore(e.currentTarget.value)}
                                        >
                                            <img src={radio.img} alt={radio.name}></img>
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Comments</Form.Label>
                                <Form.Control as="textarea" rows={5} value={review} onChange={(e) => { setReview(e.target.value) }} />
                            </Form.Group>

                            <Button className="mx-1 buttonTwo" onClick={submitForm}>
                                Submit
                            </Button>

                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}