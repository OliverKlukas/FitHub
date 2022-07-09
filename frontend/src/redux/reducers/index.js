import { combineReducers } from "redux";
import entities from "./entitiesReducer";
import user from "./userReducer";
import singleContent from "./singleContentReducer";
import boughtPlan from "./boughtPlansReducer";

export default combineReducers({
  entities,
  user,
  singleContent,
  boughtPlan,
});
