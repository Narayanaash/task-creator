import axios from "axios";
import { returnErrors } from "./errorActions";

import {
    USER_LOADED,
    USER_LOADING,
    SIGNUP_PROGRESS,
    LOGIN_PROGRESS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios
        .get("/api/user", tokenConfig(getState))
        .then(res =>
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(returnErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                });
            }
        });
};

// Register user
export const register = ({ name, email, role, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request body
    const body = JSON.stringify({ name, email, role, password });

    // User loading
    dispatch({ type: SIGNUP_PROGRESS });

    axios
        .post("/api/signup", body, config)
        .then(res =>
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            if (err.response && err.response.data) {
                dispatch(
                    returnErrors(
                        err.response.data,
                        err.response.status,
                        "REGISTER_FAIL"
                    )
                );
                dispatch({
                    type: REGISTER_FAIL
                });
            }
        });
};

//Login user
export const login = ({ email, password }) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    // Request body
    const body = JSON.stringify({ email, password });

    // User loading
    dispatch({ type: LOGIN_PROGRESS });

    axios
        .post("/api/login", body, config)
        .then(res =>
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        )
        .catch(err => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "LOGIN_FAIL"
                )
            );
            dispatch({
                type: LOGIN_FAIL
            });
        });
};

//Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

// Setup config/headers and token
export const tokenConfig = getState => {
    // Get token & localStorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    };

    //if token, add to headers
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
};
