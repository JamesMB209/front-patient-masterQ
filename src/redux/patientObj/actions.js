import axios from 'axios';

export const LOAD_OBJ = "LOAD_OBJ";
export const SUBMIT_REVIEW = "SUBMIT_REVEIW";
const token = localStorage.getItem("token");

export function loadObjThunk(data) {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_SERVER}/obj/patient`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                business: data.business,
                doctor: data.doctor,
                patient: data.patient,
            }
        })
            .then((response) => {
                return dispatch({
                    type: LOAD_OBJ,
                    payload: response.data
                })

            })
            .catch((err) => {
                console.log('Error actions patient object')
                console.error(err)
            })
    }
}


// not sure if I should move this into another catagory, but I want to effect the patientOBJ's status so ill leave it here because it contains the most relevant reducer.
export function submitReviewThunk (data) {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_SERVER}/review/submit`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                appointmentHistoryID: data.appointmentHistoryID,
                score: data.score,
                review: data.review,
            }
        })
            .then((response) => {
                return dispatch({
                    type: SUBMIT_REVIEW,
                })
            })
            .catch((err) => {
                console.log('Error actions patient object')
                console.error(err)
            })
    }
}