import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import login_img from '../assets/6.png';

export default function InQueue() {
  /** Load inital stores */
  const patientObj = useSelector((state) => state.patientObjStore)
  //console.log(patientObj)

  return (
    <>
   <Container>
      <Row>
        <Col lg={5} sm={12}>
    {/* patientObj.queuePosition > 0 */}
      {patientObj.queuePosition < 5
        /** In the queue */
        ? <div className='queue_box pt-5'>
          <div className='overlap_box'>
            <h4>Dr. {patientObj.assigned.doctor}</h4>
            <h4>Room {patientObj.assigned.room}</h4>
          </div>

          <h5 className='my-3 pt-5'>Hello {patientObj.f_name}</h5>
          <h5 className='m-5'>your position in the queue</h5>
          <p>{patientObj.queuePosition}</p>

          <h5 className='m-5'>Estimated Wait Time</h5>
          <p>{patientObj.queuePosition*5}</p>
        </div>
      
        /** First in-line to the room and whilst inside room. */
        : <div>
          <p>go to room.</p>
        </div>}

        </Col>
        <Col lg={7} sm={12} className="login-right">
          <img src={login_img} alt="login-img" className="login-img" />
        </Col>
      </Row>
    </Container>
    </>
  );
}