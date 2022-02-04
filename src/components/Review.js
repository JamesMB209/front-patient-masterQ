import { useEffect } from "react"

import { socket } from "../redux/webSockets/actions"
import { UPDATE_PATIENT } from "../redux/webSockets/actions"


export function Review() {
    /** turn off the listner on the review page to save connections - might cause issues if needing to revist */
    useEffect(() => {
        socket.off(UPDATE_PATIENT)
    })

    /** Will need to rember to update the state to "CHECKIN after submitting the review form" */

return (
    <>
        the review page bitch.
    </>
)
}