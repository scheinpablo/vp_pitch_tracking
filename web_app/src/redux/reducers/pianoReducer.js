const pianoReducer = (state = { currentPitchIndex: 0 }, action) => {
  switch (action.type) {
    case "UPDATE_PITCH_INDEX": {
      console.log(state.currentPitchIndex + 1);
      return {
        ...state,
        currentPitchIndex: state.currentPitchIndex + 1,
      };
    }
    case "SET_PITCH_INDEX": {
      console.log(state.currentPitchIndex + 1);
      return {
        ...state,
        currentPitchIndex: action.payload.newIndex,
      };
    }
    case "RESET":
      return {
        ...state,
        currentPitchIndex: 0,
      };

    default:
      return state;
  }
};

export default pianoReducer;
