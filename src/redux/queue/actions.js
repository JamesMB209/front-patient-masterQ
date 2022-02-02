// export const CHECKIN_ACTION = "CHECKIN_ACTION";
// export const CHECKOUT_ACTION = "CHECKOUT_ACTION";
// export const MOVE_PHARAMACY_ACTION = "MOVE_PHARAMACY_ACTION";
// export const REVIEW_ACTION = "REVIEW_ACTION";
export const UPDATE_QUEUE = "UPDATE_QUEUE";
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

export const updatePatient = (business, doctor, queuePosition, state ="CHECKIN") => {

  return {
    type: UPDATE_QUEUE,
    business: business,
    doctor: doctor,
    queuePosition: queuePosition,
    state: state,
  }
}
