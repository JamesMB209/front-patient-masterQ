import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button } from "react-bootstrap";

import Pharmacy from "../components/Pharmacy";
import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import { Review } from "../components/Review";

import { emit } from '../redux/webSockets/actions'
import { socket } from "../redux/webSockets/actions";
import { UPDATE_PATIENT } from "../redux/webSockets/actions";
import { loadObjThunk } from "../redux/patientObj/actions";


export default function ActivePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /** Load inital states */
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const state = useSelector((state) => state.patientObjStore.state);
  const connection = useSelector((state) => state.connectionStore)

  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);

  /** Set up listners */
  useEffect(() => {
    console.log(connection)
    socket.on(UPDATE_PATIENT, () => { dispatch(loadObjThunk(connection)) })
    return () => {
      socket.off(UPDATE_PATIENT)
    }
  }, [connection, dispatch])


  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
  const clickPharmacy = () => {
    emit("NEXT", { business: connection.business, doctor: "pharmacy" })
  }
  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */
  const clickDoctor = () => {
    emit("NEXT", connection)
  }
  /** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */

  return (
    <>
  
      {state === "CHECKIN" ? <Checkin /> : ""}
      {state === "DOCTOR" ? <InQueue /> : ""}
      {state === "PHARMACY" ? <Pharmacy /> : ""}
      {state === "REVIEW" ? <Review /> : ""}

      {/** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */}
      <div>
        <Button className='buttonOne' onClick={clickDoctor}>Doctor next</Button>
        <Button className='buttonOne' onClick={clickPharmacy}>Pharmacy next</Button>
      </div>
      {/** TESTING CODE FOR A FAKE DOCTOR AND PHARMACY BUTTON TO BE REMOVED */}
    </>
  );
}