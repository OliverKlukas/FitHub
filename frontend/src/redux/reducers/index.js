import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import singleContent from "./singleContentReducer";

export default combineReducers({
  entities,
  singleContent
});
