import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import clientReducer from "./clientReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
    project: projectReducer,
    client: clientReducer,
    error: errorReducer,
    auth: authReducer
});
