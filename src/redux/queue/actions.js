export const CHECKIN_ACTION = "CHECKIN_ACTION";
export const CHECKOUT_ACTION = "CHECKOUT_ACTION";
export const MOVE_PHARAMACY_ACTION = "MOVE_PHARAMACY_ACTION";
export const REVIEW_ACTION = "REVIEW_ACTION";


export const checkIn = (business, doctor) => {
  if (business !== '' && doctor !== '') {
    return {
      type: CHECKIN_ACTION,
      business: business,
      doctor: doctor,
    };
  } else {
    return {
      type: CHECKOUT_ACTION,
    };
  }
}

export const checkOut = () => {
  return {
    type: CHECKOUT_ACTION,
  };
}