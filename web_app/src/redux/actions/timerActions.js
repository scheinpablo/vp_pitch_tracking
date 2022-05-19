export const UPDATE_TIMER = "UPDATE_TIMER";

export const updateTimer = (deltaTime) => {
  return {
    type: UPDATE_TIMER,
    payload: { deltaTime },
  };
};

export const START_TIMER = "START_TIMER";

export const startTimer = () => {
  console.log("startTimer");
  return {
    type: START_TIMER,
  };
};
export const PAUSE_TIMER = "PAUSE_TIMER";

export const pauseTimer = () => {
  return {
    type: PAUSE_TIMER,
  };
};
export const STOP_TIMER = "STOP_TIMER";

export const stopTimer = () => {
  return {
    type: STOP_TIMER,
  };
};
export const RESET_TIMER = "RESET";
export const resetTimer = () => {
  return {
    type: RESET_TIMER,
  };
};
