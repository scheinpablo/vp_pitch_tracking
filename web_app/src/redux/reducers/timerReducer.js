const timerReducer = (state = { isRunning: false, time: 0 }, action) => {
  switch (action.type) {
    case "UPDATE_TIMER":
      if (state.isRunning) {
        return {
          ...state,
          time: state.time + action.payload.deltaTime,
        };
      } else {
        return state;
      }
    case "SET_TIMER":
      return {
        ...state,
        time: action.payload.newTime,
      };

    case "START_TIMER":
      return {
        ...state,
        isRunning: true,
        time: 0,
      };
    case "PAUSE_TIMER":
      return {
        ...state,
        isRunning: false,
      };
    case "STOP_TIMER":
      return {
        ...state,
        isRunning: false,
        time: 0,
      };
    case "RESET":
      return {
        ...state,
        time: 0,
      };
    default:
      return state;
  }
};

export default timerReducer;
