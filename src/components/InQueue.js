import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import socketIOClient from 'socket.io-client';
import { useDispatch } from "react-redux";
import { updatePatient } from "../redux/queue/actions";


export default function InQueue(props) {
  // const dispatch = useDispatch();

  /** Load inital states */
  const queueStore = useSelector((state) => state.queueStore);
  const [socket, setSocket] = useState(null)
  // const [queuePosition, setQueuePosition] = useState('');

  // // //Set up socket connection
  // let token = localStorage.getItem("token");

  // useEffect(() => {
  //   setSocket(socketIOClient(process.env.REACT_APP_API_SERVER, {
  //     transports: ['websocket'],
  //     query: { token }
  //   }))
  // }, []);

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("UPDATE_PATIENT", () => {
  //     socket.emit("GET_PATIENT_OBJ", { ...queueStore });
  //     console.log('ha[[eend')
  //   })


  //   let address = token.slice(-10)
  //   socket.on(address, (patient) => {
  //     // if (patient == "patient not found.") { return }
  //     // // test1(patient)
  //     console.log(patient)
  //     dispatch(updatePatient(queueStore.business, queueStore.doctor, patient.state, patient.queuePosition))
  //   })
  // }, [socket]);

  // // console.log(data)
  // const handlePatient = (patient) => {
  //   console.log(patient)
  //   dispatch(updatePatient(queueStore.business, queueStore.doctor, patient.state, 11))
  // }

  // useEffect(() => {
  //   if (!socket) return;
  //   return () => socket.disconnect();
  // }, [socket]);

  // console.log(queueStore)

  return (
    <>
      {queueStore.queuePosition > 0
        ? <div>  
          <p>your position in the queue</p>
          <p>{queueStore.queuePosition}</p>
        </div>

        : <div>
          <p>go to room.</p>
        </div>}
        <Button onClick={() => {props.cb()}}>checkin</Button>
      {/* <Button onClick={() => { socket.emit("NEXT", { ...queueStore }) }}>advance the doctors queue</Button> */}

    </>
  );
}