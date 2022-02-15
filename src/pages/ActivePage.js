import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import Review from "../components/Review";

import { emit, socket, UPDATE_PATIENT, DOCTOR_ROOM, PHARMACY_ROOM } from '../redux/webSockets/actions'
import { loadObjThunk } from "../redux/patientObj/actions";


export default function ActivePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if ([CHECKIN, DOCTOR, PHARMACY].includes(state)) {
      socket.on(UPDATE_PATIENT, () => { 
        dispatch(loadObjThunk(connection)) 
      })

      switch (state) {
        case DOCTOR:
          emit(DOCTOR_ROOM, {...connection})
          break;
        case PHARMACY:
          emit(PHARMACY_ROOM, {...connection})
          break;
        default:
          break;
      }

    }
    return () => {
      socket.off(UPDATE_PATIENT)
    }
  }, [state, connection, dispatch, CHECKIN, DOCTOR, PHARMACY])


  return (
    <>
      {state === CHECKIN ? <Checkin /> : ""}
      {state === DOCTOR ? <InQueue page={DOCTOR} waitTime={5} /> : ""}
      {state === PHARMACY ? <InQueue page={PHARMACY} waitTime={3} /> : ""}
      {state === REVIEW ? <Review /> : ""}
    </>
  );
}