import { useSelector, useDispatch } from "react-redux";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
const PianoComponent = () => {
  return (
    <Piano
      noteRange={{
        first: MidiNumbers.fromNote("a0"),
        last: MidiNumbers.fromNote("G9"),
      }}
      playNote={(midiNumber) => {
        // Play a given note - see notes below
      }}
      stopNote={(midiNumber) => {
        // Stop playing a given note - see notes below
      }}
      width={1500}
    />
  );
};

export default PianoComponent;
