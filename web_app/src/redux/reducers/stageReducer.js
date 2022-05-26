const stageReducer = (state = { stage: "selecting" }, action) => {
  switch (action.type) {
    case "SELECT_FILE": {
      return {
        ...state,
        stage: "uploaded",
      };
    }
    case "ANALYZE_FILE":
      return {
        ...state,
        stage: "analyzing",
      };
    case "ANALYZED_FILE":
      return {
        ...state,
        stage: "readyToPlay",
      };
    case "CANCEL_FILE":
      return {
        ...state,
        stage: "selecting",
      };

    default:
      return state;
  }
};

export default stageReducer;
