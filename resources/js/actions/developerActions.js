import axios from "axios";
import { GET_DEVELOPERS } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getDevelopers = id => (dispatch, getState) => {
    axios
        .get("/api/projects/" + id + "/developers", tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_DEVELOPERS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};
