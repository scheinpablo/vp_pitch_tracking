import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import fileReducer from "./fileReducer";
import stageReducer from "./stageReducer";

const reducer = combineReducers({
  timer: timerReducer,
  stage: stageReducer,
  file: fileReducer,
});

export default reducer;
