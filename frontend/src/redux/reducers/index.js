import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import user from "./userReducer"

export default combineReducers({
    entities, user,
});
