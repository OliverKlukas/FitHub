import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import user from "./userReducer";
import singleContent from "./singleContentReducer";
import creatorsNames from "./creatorsNames";


export default combineReducers({
  entities,
  user,
  creatorsNames,
  singleContent
});
