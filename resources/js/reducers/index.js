import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import clientReducer from "./clientReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
    project: projectReducer,
    task: taskReducer,
    client: clientReducer,
    error: errorReducer,
    auth: authReducer
});
