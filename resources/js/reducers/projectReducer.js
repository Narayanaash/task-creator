import {
    GET_PROJECTS,
    ADD_PROJECT,
    DELETE_PROJECT,
    PROJECTS_LOADING,
    PROJECT_UPLOADING
} from "../actions/types";

const initialState = {
    projects: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                loading: false,
                uploaded: false
            };
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(
                    project => project._id !== action.payload
                )
            };
        case ADD_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects],
                uploaded: true
            };
        case PROJECTS_LOADING:
            return {
                ...state,
                loading: true
            };
        case PROJECT_UPLOADING:
            return {
                ...state,
                uploading: true
            };
        default:
            return state;
    }
}
