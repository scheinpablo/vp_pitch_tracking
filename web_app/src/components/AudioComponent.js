import React, { useState, useRef, useEffect } from "react";
import {
  updateTimer,
  pauseTimer,
  startTimer,
  resetTimer
} from "../redux/actions/timerActions";

import { useSelector, useDispatch } from "react-redux";

const AudioComponent = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.file.selectedFile);
  const time = useSelector((state) => state.timer.time);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const audioRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) dispatch(updateTimer(10));
    }, 10);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <audio
      ref={audioRef}
      autoPlay={false}
      controls={true}
      onEnded={() => {
        dispatch(resetTimer());
      }}
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
