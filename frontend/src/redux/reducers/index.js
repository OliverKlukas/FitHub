import { combineReducers } from "redux";
import allContent from "./allContentReducer";
import user from "./userReducer";
import singleContent from "./singleContentReducer";
import boughtPlan from "./boughtPlansReducer";
import creatorsNames from "./creatorsNames";

export default combineReducers({
  allContent,
  user,
  singleContent,
  boughtPlan,
  creatorsNames
});
