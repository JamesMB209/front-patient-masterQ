import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import { checkOut } from "../redux/queue/actions";

export default function ActivePage() {
  /** Load inital states */
  const navigate = useNavigate();
  const auth = useSelector((state) => state.authStore.isAuthenticated);
  // const checkedIn = useSelector((state) => state.queueStore.checkedIn);
  const queueStore = useSelector((state) => state.queueStore);
  /** Check logged in */
  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const dispatch = useDispatch();

  return (
    <>{queueStore.checkedIn === true
      ? <InQueue {...queueStore}/>
      : <Checkin />
    }
    <Button onClick={() => {dispatch(checkOut())}}>Checkout - testing</Button>
    </>
  );
}