import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import frequencyToMidiNoteNumber from "frequency-to-midi-note-number";

const PianoComponent = (props) => {
  const isRunning = useSelector((state) => state.timer.isRunning);
  const filePitches = useSelector((state) => state.file.filePitches);
  const currentPitchIndex = useSelector(
    (state) => state.piano.currentPitchIndex
  );
  let currentPitch = filePitches[currentPitchIndex];
  let midi = frequencyToMidiNoteNumber(currentPitch);

  return (
    <div>
      <h2>
        freq:{" "}
        {currentPitch != undefined && currentPitch != 1
          ? currentPitch.toFixed(2) + "Hz"
          : "-"}
      </h2>
      <h2>note: {midi > 0 ? midi : "-"}</h2>
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
