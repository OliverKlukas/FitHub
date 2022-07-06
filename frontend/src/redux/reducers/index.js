/* eslint-disable prettier/prettier */
import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import user from "./userReducer";
import singleContent from "./singleContentReducer";

export default combineReducers({
  entities,
  user,
  singleContent
});
