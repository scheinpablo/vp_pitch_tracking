import React, { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  pauseTimer,
  resetTimer,
  startTimer,
} from "../redux/actions/timerActions";
import { dataURLtoFile } from "../redux/selectedFileStorage";
const AudioComponent = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.file.selectedFile);
  const audioRef = useRef();
  return (
    <audio
      ref={audioRef}
      autoPlay={false}
      controls={true}
      onPlay={() => {
        dispatch(startTimer());
      }}
      onPause={() => {
        dispatch(pauseTimer());
      }}
      onReset={() => {
        dispatch(resetTimer());
      }}
      src={selectedFile}
    />
  );
};

export default AudioComponent;
