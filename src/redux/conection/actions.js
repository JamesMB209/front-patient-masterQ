export const UPDATE_CONNECTION = 'UPDATE_CONNECTION';

export function setConnection(data) {
    return {
        type: UPDATE_CONNECTION,
        payload:{
            business:data.business,
            doctor:data.doctor,
        }
    }
}
