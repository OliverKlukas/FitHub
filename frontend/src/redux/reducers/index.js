import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import user from "./userReducer";
import singleContent from "./singleContentReducer";
import boughtPlan from "./boughtPlansReducer";
import creatorsNames from "./creatorsNames";


export default combineReducers({
  entities,
  user,
  singleContent,
  boughtPlan,
  creatorsNames,
  singleContent
});
