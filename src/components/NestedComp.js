import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Checkin from "../components/Checkin";
import InQueue from "../components/InQueue";
import { checkOut } from "../redux/queue/actions";

export default function NestedComp(props) {
  return (
    <>
        fukcing {props.que}
    </>
  );
}