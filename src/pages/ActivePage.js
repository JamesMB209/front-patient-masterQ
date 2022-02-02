import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pharmacy from "../components/Pharmacy";
import socketIOClient from 'socket.io-client';

import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import { updatePatient } from "../redux/queue/actions";
import { propTypes } from "react-bootstrap/esm/Image";

export default function ActivePage() {
  /** Load inital states */
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  const queueStore = useSelector((state) => state.queueStore);
  const [socket, setSocket] = useState(null)
  // const [queuePosition, setQueuePosition] = useState('');

  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const dispatch = useDispatch();

  //Set up socket connection
  let token = localStorage.getItem("token");

  useEffect(() => {
    setSocket(socketIOClient(process.env.REACT_APP_API_SERVER, {
      transports: ['websocket'],
      query: { token }
    }))
  }, []);

  //Set up listeners and close conection if they die.
  useEffect(() => {
    if (!socket) return;
    console.log("active use effect")
    

    socket.on("UPDATE_PATIENT", () => {
      console.log('--------update patient --------')
      console.log(queueStore)
      socket.emit("GET_PATIENT_OBJ", { ...queueStore });
    })

    socket.on(token, (patient) => {
      if (patient == "patient not found.") {
        console.log("end of the line")
      }
      console.log('--------on token --------')
      console.log(patient)
      // console.log(queueStore.business, queueStore.doctor, patient.queuePosition, patient.state);
      console.log('----------------')
      dispatch(updatePatient(queueStore.business, patient.doctor, patient.queuePosition, patient.state))

    })

    // return () => socket.disconnect();
  }, [queueStore]);

  useEffect(() => {
    if (!socket) return;
    return () => socket.disconnect();
  }, [socket]);

  function checkInButton (business, doctor) {
    dispatch(updatePatient(business, doctor))
    socket.emit("CHECKIN", { business:business, doctor:doctor })
    socket.emit("JOIN_ROOM", { business:business, doctor:doctor });
  }


  return (
    <>
      {queueStore.state === "CHECKIN" ? <Checkin cb={checkInButton}/> : ""}
      {queueStore.state === "DOCTOR" ? <InQueue /> : ""}
      {queueStore.state === "PHARMACY" ? <Pharmacy /> : ""}

      {/* <Button onClick={() => { dispatch(checkOut()) }}>Checkout - testing</Button> */}
      <Button onClick={() => { socket.emit("NEXT", { ...queueStore }) }}>advance the doctors queue</Button>
      {/* <Button onClick={() => { socket.emit("CHECKIN", { ...queueStore }) }}>check in socket </Button> */}
      {/* <Button onClick={() => { socket.emit("JOIN_ROOM", { ...queueStore }) }}>join room </Button> */}
    </>
  );
}