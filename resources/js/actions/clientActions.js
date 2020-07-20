import axios from "axios";
import { GET_CLIENTS } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getClients = () => (dispatch, getState) => {
    axios
        .get("/api/get-clients", tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_CLIENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
