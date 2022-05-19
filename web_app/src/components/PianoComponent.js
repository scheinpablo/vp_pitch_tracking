import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import frequencyToMidiNoteNumber from "frequency-to-midi-note-number";
import {
  restartPitchIndex,
  updatePitchIndex,
} from "../redux/actions/pianoActions";
const PianoComponent = () => {
  const dispatch = useDispatch();
  const currentPitchIndex = useSelector(
    (state) => state.piano.currentPitchIndex
  );
  const fileWindowTime = useSelector((state) => state.file.fileWindowTime);
  const playerTime = useSelector((state) => state.timer.time);
  const filePitches = useSelector((state) => state.file.filePitches);
  const isRunning = useSelector((state) => state.timer.isRunning);

  // On file select (from the pop up)

  useEffect(() => {
    getCurrDuration();
  }, [playerTime]);

  const getCurrDuration = () => {
    if (playerTime >= currentPitchIndex * fileWindowTime) {
      if (currentPitchIndex + 1 < filePitches.length) {
        dispatch(updatePitchIndex());
      } else {
        dispatch(restartPitchIndex());
      }
    }
  };
  let midi = frequencyToMidiNoteNumber(filePitches[currentPitchIndex]);
  return (
    <div>
      <h2>freq: {filePitches[currentPitchIndex].toFixed(2)}Hz</h2>
      <h2>note: {midi}</h2>
      <Piano
        noteRange={{
          first: MidiNumbers.fromNote("a0"),
          last: MidiNumbers.fromNote("F5"),
        }}
        activeNotes={isRunning && midi > 0 ? [midi] : []}
        playNote={(midiNumber) => {
          // Play a given note - see notes below
        }}
        stopNote={(midiNumber) => {
          // Stop playing a given note - see notes below
        }}
        width={1500}
      />
    </div>
  );
};

export default PianoComponent;
