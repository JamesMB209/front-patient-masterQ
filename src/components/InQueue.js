import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import socketIOClient from 'socket.io-client';

import Checkin from "../components/Checkin";
import { checkOut } from "../redux/queue/actions";
import NestedComp from "./NestedComp";

export default function InQueue(props) {
  /** Load inital states */
  const queueStore = useSelector((state) => state.queueStore);
  const [socket, setSocket] = useState(null)
  const [queuePosition, setQueuePosition] = useState('');

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
    socket.emit("JOIN_ROOM", { ...queueStore });

    socket.on("UPDATE_PATIENT", () => {
      socket.emit("GET_QUEUE_POSTITION", { ...queueStore });
    })

    socket.on(token, (queuePosition) => {
      console.log("triggered for me and not for the")
      console.log(queuePosition)
      setQueuePosition(queuePosition);
    });

    return () => socket.disconnect();
  }, [socket]);

  return (
    <>
      <p>{queuePosition}</p>
      <NestedComp que={queuePosition} />
      <button onClick={() => { socket.emit("NEXT", { ...queueStore }) }}>test button to advance the doctors queue</button>
    </>
  );
}