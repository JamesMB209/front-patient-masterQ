import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import socketIOClient from 'socket.io-client';
import { useDispatch } from "react-redux";
import { moveToPharmacy } from "../redux/queue/actions";


export default function InQueue() {
  // const dispatch = useDispatch();

  /** Load inital states */
  const queueStore = useSelector((state) => state.queueStore);
  // const [socket, setSocket] = useState(null)
  // const [queuePosition, setQueuePosition] = useState('');

  // //Set up socket connection
  // let token = localStorage.getItem("token");

  // useEffect(() => {
  //   setSocket(socketIOClient(process.env.REACT_APP_API_SERVER, {
  //     transports: ['websocket'],
  //     query: { token }
  //   }))
  // }, []);

  // //Set up listeners and close conection if they die.
  // useEffect(() => {
  //   if (!socket) return;
  //   socket.emit("JOIN_ROOM", { ...queueStore });

  //   socket.on("UPDATE_PATIENT", () => {
  //     socket.emit("GET_PATIENT_OBJ", { ...queueStore });
  //   })

  //   socket.on(token, (patient) => {
  //     setQueuePosition(patient.queuePosition);
  //     if (patient.queuePosition == 0) {
  //       dispatch(moveToPharmacy)
  //     }
  //   });

  //   return () => socket.disconnect();
  // }, [socket]);

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
    </>
  );
}