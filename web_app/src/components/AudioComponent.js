import React, { useState, useRef, useEffect } from "react";
import {
  updateTimer,
  pauseTimer,
  startTimer,
  resetTimer,
  setTimer,
} from "../redux/actions/timerActions";

import { useSelector, useDispatch } from "react-redux";
import {
  restartPitchIndex,
  setPitchIndex,
  updatePitchIndex,
} from "../redux/actions/pianoActions";

const AudioComponent = () => {
  const dispatch = useDispatch();
  const selectedFile = useSelector((state) => state.file.selectedFile);
  const time = useSelector((state) => state.timer.time);
  const fileWindowTime = useSelector((state) => state.file.fileWindowTime);

  const filePitches = useSelector((state) => state.file.filePitches);
  const currentPitchIndex = useSelector(
    (state) => state.piano.currentPitchIndex
  );

  const isRunning = useSelector((state) => state.timer.isRunning);
  const audioRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRunning) return;
      console.log("currTime" + audioRef.current.currentTime);
      dispatch(
        setPitchIndex(Math.floor((audioRef.current.currentTime * 1000) / 25))
      );
    }, 10);
    return () => clearInterval(interval);
  }, [isRunning, currentPitchIndex]);

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
