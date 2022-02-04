import axios from 'axios';

export const LOAD_OBJ = "LOAD_OBJ";

export function loadObjThunk(data) {
    console.log(data)
    return (dispatch) => {
        let token = localStorage.getItem("token");
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
                console.log(response)
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