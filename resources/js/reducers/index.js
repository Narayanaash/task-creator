import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import taskReducer from "./taskReducer";
import clientReducer from "./clientReducer";
import developerReducer from "./developerReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
    project: projectReducer,
    task: taskReducer,
    client: clientReducer,
    developer: developerReducer,
    error: errorReducer,
    auth: authReducer
});
