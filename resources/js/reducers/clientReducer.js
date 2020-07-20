import { GET_CLIENTS } from "../actions/types";

const initialState = {
    clients: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS:
            return {
                ...state,
                clients: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
