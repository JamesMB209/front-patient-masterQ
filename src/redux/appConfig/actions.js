import axios from 'axios';

export const LOAD_CONFIG = "LOAD_CONFIG";

export function loadConfigThunk() {
    return (dispatch) => {
        let token = localStorage.getItem("token");
        return axios.get(`${process.env.REACT_APP_API_SERVER}/api/config`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            return dispatch({
                type: LOAD_CONFIG,
                data: response.data
            })
            
        })
        .catch((err) => {
            console.log('error requesting company config.')
            console.error(err)
        })
    }
}