import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "react-bootstrap";

import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import Review from "../components/Review";
import { loadConfigThunk } from "../redux/appConfig/actions";

import { emit, socket, UPDATE_PATIENT } from '../redux/webSockets/actions'
import { loadObjThunk } from "../redux/patientObj/actions";


export default function ActivePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(loadConfigThunk())

  /** Load inital states */
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const state = useSelector((state) => state.patientObjStore.state);
  const connection = useSelector((state) => state.connectionStore)
  const [CHECKIN, DOCTOR, PHARMACY, REVIEW] = ["CHECKIN", "DOCTOR", "PHARMACY", "REVIEW"]

  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);


  /** Set up listners */
  useEffect(() => {
    if ([CHECKIN, DOCTOR, PHARMACY, REVIEW].includes(state)) {
      socket.on(UPDATE_PATIENT, () => { dispatch(loadObjThunk(connection)) })

      /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
      socket.on("UPDATE_BUSINESS", () => { console.log("recieved a business update message.") })
      /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
    }
    return () => {
      socket.off(UPDATE_PATIENT)

      /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
      socket.off("UPDATE_BUSINESS")
      /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
    }
  }, [state, connection, dispatch])


  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
  const clickPharmacy = () => {
    emit("NEXT", { business: connection.business, doctor: "pharmacy" })
  }
  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
  const clickDoctor = () => {
    emit("NEXT", connection)
  }
  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
  const clickMoveUp = (patientID) => {
    emit("MOVE_UP", { ...connection, patientID:patientID })
  }
  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
  const clickDelete = (patientID) => {
    emit("DELETE", { ...connection, patientID:patientID })
  }
  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */


  return (
    <>
      {state === CHECKIN ? <Checkin /> : ""}
      {state === DOCTOR ? <InQueue page={DOCTOR} waitTime={5} /> : ""}
      {state === PHARMACY ? <InQueue page={PHARMACY} waitTime={3} /> : ""}
      {state === REVIEW ? <Review /> : ""}

      {/** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */}
      <div>
        <Button className='buttonOne' onClick={clickDoctor}>Doctor next</Button>
        <Button className='buttonOne' onClick={clickPharmacy}>Pharmacy next</Button>
        <Button className='buttonOne' onClick={() => clickMoveUp(11)}>Move patient (id:11) up</Button>
        <Button className='buttonOne' onClick={() => clickDelete(12)}>Delete patient (id:12) up</Button>
      </div>
      {/** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */}
    </>
  );
}