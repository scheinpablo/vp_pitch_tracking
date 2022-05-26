import { combineReducers } from "redux";
import timerReducer from "./timerReducer";
import fileReducer from "./fileReducer";
import stageReducer from "./stageReducer";
import pianoReducer from "./pianoReducer";

const reducer = combineReducers({
  timer: timerReducer,
  stage: stageReducer,
  file: fileReducer,
  piano: pianoReducer,
});

export default reducer;
