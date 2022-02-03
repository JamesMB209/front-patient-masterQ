/* eslint-disable no-unused-expressions */

// export const CHECKIN_ACTION = "CHECKIN_ACTION";
// export const CHECKOUT_ACTION = "CHECKOUT_ACTION";
// export const MOVE_PHARAMACY_ACTION = "MOVE_PHARAMACY_ACTION";
// export const REVIEW_ACTION = "REVIEW_ACTION";
// export const UPDATE_QUEUE = "UPDATE_QUEUE";
export const GET_PATIENT_OBJ = "GET_PATIENT_OBJ";
export const CHECKIN = "CHECKIN";
export const LOAD_OBJ = "LOAD_OBJ";
// export const UPDATE_STATE = "UPDATE_STATE";


// export const checkIn = (business, doctor) => {
//   if (business !== '' && doctor !== '') {
//     return {
//       type: CHECKIN_ACTION,
//       business: business,
//       doctor: doctor
//     };
//   } else {
//     return {
//       type: CHECKOUT_ACTION,
//     };
//   }
// }

// export const checkOut = () => {
//   return {
//     type: CHECKOUT_ACTION,
//   };
// }

export const updatePatient = (obj) => {
  return {
    type: LOAD_OBJ,
    payload:{...obj}
  }
}

/** thunk type functions below */
export function doctorNextThunk (business, doctor) {
  console.log("this was called")
  return (dispatch, placeholder ,{emit} ) => {
    emit( "NEXT", {business:business, doctor:doctor})
  }
}

export function checkInSock (data) {
return (dispatch, placeholder ,{emit} ) => {
    // dispatch({
    //   type: CHECKIN,
    //   business: data.business,
    //   doctor: data.doctor,
    //   state: "DOCTOR",
    // }),
    emit ( CHECKIN, {
      business: data.business,
      doctor: data.doctor,
      // state: "DOCTOR",
    })

}
}