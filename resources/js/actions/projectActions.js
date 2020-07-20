import axios from "axios";
import {
    GET_PROJECTS,
    ADD_PROJECT,
    DELETE_PROJECT,
    PROJECTS_LOADING,
    PROJECT_UPLOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getProjects = () => dispatch => {
    dispatch(setProjectLoading());
    axios
        .get("/api/projects")
        .then(res =>
            dispatch({
                type: GET_PROJECTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addProject = (project, id) => (dispatch, getState) => {
    dispatch(setProjectUploading());
    if (id) {
        axios
            .put("/api/projects/" + id, project, tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: ADD_PROJECT,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
            );
    } else {
        axios
            .post("/api/projects", project, tokenConfig(getState))
            .then(res =>
                dispatch({
                    type: ADD_PROJECT,
                    payload: res.data
                })
            )
            .catch(err =>
                dispatch(returnErrors(err.response.data, err.response.status))
            );
    }
};

export const deleteProject = id => (dispatch, getState) => {
    axios
        .delete(`/api/projects/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_PROJECT,
                payload: id
            })
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const setProjectLoading = () => {
    return {
        type: PROJECTS_LOADING
    };
};

export const setProjectUploading = () => {
    return {
        type: PROJECT_UPLOADING
    };
};
