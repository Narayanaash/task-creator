import axios from "axios";
import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    TASKS_LOADING,
    TASK_UPLOADING
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTasks = id => (dispatch, getState) => {
    // alert('called')
    dispatch(setTaskLoading());
    axios
        .get("/api/projects/" + id + "/tasks", tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_TASKS,
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
            .then(res => {
                dispatch({
                    type: ADD_PROJECT,
                    payload: res.data
                });
                axios
                    .get("/api/projects")
                    .then(res =>
                        dispatch({
                            type: GET_PROJECTS,
                            payload: res.data
                        })
                    )
                    .catch(err =>
                        dispatch(
                            returnErrors(err.response.data, err.response.status)
                        )
                    );
            })
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

export const setTaskLoading = () => {
    return {
        type: TASKS_LOADING
    };
};

export const setTaskUploading = () => {
    return {
        type: TASK_UPLOADING
    };
};
