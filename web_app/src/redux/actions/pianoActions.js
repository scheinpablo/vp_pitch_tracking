export const UPDATE_PITCH_INDEX = "UPDATE_PITCH_INDEX";

export const updatePitchIndex = () => {
  return {
    type: UPDATE_PITCH_INDEX,
  };
};
export const SET_PITCH_INDEX = "SET_PITCH_INDEX";

export const setPitchIndex = (newIndex) => {
  return {
    type: SET_PITCH_INDEX,
    payload: { newIndex },
  };
};
export const RESTART_PITCH_INDEX = "RESET";

export const restartPitchIndex = () => {
  return {
    type: RESTART_PITCH_INDEX,
  };
};
