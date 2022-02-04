import { useSelector } from "react-redux";


export default function InQueue() {
  /** Load inital stores */
  const patientObj = useSelector((state) => state.patientObjStore)


  return (
    <>
      {patientObj.queuePosition > 0
        /** In the queue */
        ? <div>
          <p>your position in the queue</p>
          <p>{patientObj.queuePosition}</p>
        </div>

        /** First in-line to the room and whislt inside room. */
        : <div>
          <p>go to room.</p>
        </div>}
    </>
  );
}