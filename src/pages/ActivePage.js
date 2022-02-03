import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pharmacy from "../components/Pharmacy";
import socketIOClient from 'socket.io-client';

import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import { doctorNext, doctorNextThunk, updatePatient } from "../redux/queue/actions";
import { propTypes } from "react-bootstrap/esm/Image";
import { emit } from '../redux/webSockets/actions'



export default function ActivePage() {
  // /** Load inital states */
  // const navigate = useNavigate();
  // const auth = useSelector((state) => state.authStore.isAuthenticated);
  const queueStore = useSelector((state) => state.queueStore);
  // const [socket, setSocket] = useState(null)
  // const [data, setData] = useState(queueStore)
  // // const [queuePosition, setQueuePosition] = useState('');

  // /** Check logged in */
  // useEffect(() => {
  //   if (auth !== true) {
  //     navigate("/login");
  //   }
  // }, [auth, navigate]);

  const dispatch = useDispatch();

  // //Set up socket connection
  // let token = localStorage.getItem("token");

  // useEffect(() => {
  //   setSocket(socketIOClient(process.env.REACT_APP_API_SERVER, {
  //     transports: ['websocket'],
  //     query: { token }
  //   }))
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;
    
  //   console.log("I RAN I RAN I FUCKIGN RAN")
    
  //   socket.on("UPDATE_PATIENT", () => reqUpdate())
    
  //   let address = token.slice(-10)
  //   socket.on(address, handleUpdate)

  //   // return () => socket.disconnect();
  // }, [socket]);

  // console.log("component was reloaded")
  // console.log(queueStore)

  // // const callBack = () => {
  // //   reqUpdate()
  // // }

  // const reqUpdate = () => {
  //   console.log("handle update ran")
  //   console.log(queueStore)
  //     socket.emit("GET_PATIENT_OBJ", {...queueStore} );
  // }

  // const handleUpdate = (patient) => {
  //   console.log("handle patient ran")
  //   console.log(patient)
  //   // dispatch(updatePatient(queueStore.business, patient.doctor, patient.queuePosition, patient.state))
  //   setData({business:queueStore.business, doctor:patient.doctor, state:patient.state, queuePosition:patient.queuePosition})
  // }

  // useEffect(() => {
  //   if (!socket) return;

  //   return () => socket.disconnect();
  // }, [socket]);


  const click = () => {
    console.log('clicked')
    dispatch(doctorNextThunk(1,1))
  }

  const [pageMode, setPageMode] = useState("CHECKIN")

  return (
    <>
    action page
    <Button onClick={click}>clicky clicky</Button>
       {queueStore.state === "CHECKIN" ? <Checkin /> : ""}
       {queueStore.state === "DOCTOR" ? <InQueue queuePosition={queueStore.queuePosition}/> : ""}
       {queueStore.state === "PHARMACY" ? <Pharmacy /> : ""}
    
      {/* <Button onClick={() => { dispatch(checkOut()) }}>Checkout - testing</Button> */}
      {/* <Button onClick={() => { socket.emit("NEXT", { ...queueStore }) }}>advance the doctors queue</Button>
       {/* <Button onClick={() => { socket.emit("CHECKIN", { ...queueStore }) }}>check in socket </Button> */}
       {/* <Button onClick={() => { socket.emit("JOIN_ROOM", { ...queueStore }) }}>join room </Button> */}
     </>
  );
}