import { GET_DEVELOPERS } from "../actions/types";

const initialState = {
    developers: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_DEVELOPERS:
            return {
                ...state,
                developers: action.payload,
                loading: false
            };
        default:
            return state;
    }
}
