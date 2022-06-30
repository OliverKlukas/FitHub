import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import selectedMovie from "./selectedMovieReducer";

export default combineReducers({
    entities,
    selectedMovie,
});
