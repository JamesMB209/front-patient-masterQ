import { useState } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

import { submitReviewThunk } from '../redux/patientObj/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Review() {
    /** Will need to rember to update the state to "CHECKIN after submitting the review form" */
    const dispatch = useDispatch();
    
    const [score, setScore] = useState('2');
    const [review, setReview] = useState();
    const appointmentHistoryID = useSelector((state) => state.patientObjStore.appointmentHistoryID);

    const radios = [
        { name: 'sad', value: '1' },
        { name: 'indiferent', value: '2' },
        { name: 'happy', value: '3' },
    ];

    function submitForm () {
         dispatch(submitReviewThunk({
            appointmentHistoryID:appointmentHistoryID,
            score:score,
            review:review,
        }))
    }
    return (
        <>
            <div className='login_box d-flex'>
                <Form className='justify-content-center'>
                    <h5>Review</h5>
                    <hr className="under-line text-center" />
                    <Form.Group className="mb-3" controlId="formBasicSatisfaction">
                        <ButtonGroup className="mb-2">
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
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Comments</Form.Label>
                        <Form.Control as="textarea" rows={5} value={review} onChange={(e) => { setReview(e.target.value) }} />
                    </Form.Group>


                    <div className='d-flex justify-content-center'>
                        <Button className="mx-1 buttonTwo" onClick={submitForm}>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}