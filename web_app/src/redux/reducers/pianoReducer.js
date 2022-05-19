const pianoReducer = (state = { currentPitchIndex: 0 }, action) => {
  switch (action.type) {
    case "UPDATE_PITCH_INDEX": {
      return {
        ...state,
        currentPitchIndex: state.currentPitchIndex + 1,
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
