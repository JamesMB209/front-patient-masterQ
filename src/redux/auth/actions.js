import axios from "axios";

export const LOGIN_REQUEST_ACTION = "LOGIN_REQUEST_ACTION";
export const LOGIN_SUCCESS_ACTION = "LOGIN_SUCCESS_ACTION";
export const LOGIN_FAILURE_ACTION = "LOGIN_FAILURE_ACTION";
export const LOGOUT_NOW_ACTION = "LOGOUT_NOW_ACTION";

function loginSuccessActionCreator() {
  return {
    type: LOGIN_SUCCESS_ACTION,
  };
}

function loginFailureActionCreator(message) {
  return {
    type: LOGIN_FAILURE_ACTION,
    message: message,
  };
}

export const signupThunk = (patient) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/signup`,
      {...patient}
    );

    const { data } = response;
    console.log("request sent");
    console.log(data);
    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS_ACTION });
  } catch (err) {
    console.log(err);
  }
};

// Action creators thunk
export const loginUserThunk = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST_ACTION });
    console.log(email, password);
    const response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/api/login`,
      {
        type: "patients",
        email: email,
        password: password,
      }
    );

    const { data } = response;
    if (data == null) {
      dispatch({
        type: LOGIN_FAILURE_ACTION,
        message: "Unknown Error",
      });
    } else if (!data.token) {
      dispatch({
        type: LOGIN_FAILURE_ACTION,
        message: data.message || "No Token!",
      });
    } else {
      localStorage.setItem("token", data.token);
      dispatch({ type: LOGIN_SUCCESS_ACTION, config: data.config, businessConfig: data.businessConfig});
    }
  } catch (err) {
    console.log("ERROR " + err);
  }
};

export const logoutNowThunk = () => (dispatch) => {
  localStorage.clear("token");
  dispatch({ type: LOGOUT_NOW_ACTION });
};

export function loginFacebookThunk(data) {
  console.log("thunk thunk thunk ");
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/login/facebook`, {
        info: data,
      })
      .then((response) => {
        if (response.data == null) {
          dispatch(loginFailureActionCreator("Unknown Error"));
        } else if (!response.data.token) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginFailureActionCreator(response.data.message || ""));
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem("token", response.data.token);
          // Dispatch the success action
          dispatch(loginSuccessActionCreator());
        }
      })
      .catch((err) => console.log("Error: ", err));
  };
}
