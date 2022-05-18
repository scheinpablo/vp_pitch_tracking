import logo from "./logo.svg";
import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

import React, { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import frequencyToMidiNoteNumber from "frequency-to-midi-note-number";

import FileSelection from "./components/FileSelection";
import FilePreview from "./components/FilePreview";
import AudioComponent from "./components/AudioComponent";
import PianoComponent from "./components/PianoComponent";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const selectedFileName = useSelector((state) => state.file.selectedFileName);
  const stage = useSelector((state) => state.stage.stage);
  const successResponse = useSelector((state) => state.file.successResponse);
  // const [currentPitchIndex, setCurrentPitchIndex] = useState(null);
  let currentPitchIndex = 0;
  // On file select (from the pop up)

  /*   const getCurrDuration = () => {
    console.log(fileWindowTime);
    console.log(playerTime);
    if (playerTime >= currentPitchIndex * fileWindowTime) {
      console.log(
        "frec",
        frequencyToMidiNoteNumber(filePitches[currentPitchIndex])
      );
      if (currentPitchIndex + 1 < filePitches.length) {
        currentPitchIndex++;
      } else {
        currentPitchIndex = 0;
      }
    }
  }; */
  console.log(stage);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{stage}</h1>
        {/* <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div> */}

        {stage == "selecting" && <FileSelection />}
        {stage == "uploaded" && <FilePreview />}
        <h1></h1>
        {stage == "analyzing" && <LoadingComponent />}
        {successResponse && (
          <div>
            <h3>File analyzed!</h3>

            <div>{selectedFileName}</div>

            <h3></h3>
            <AudioComponent />

            <h3></h3>
            <PianoComponent />
          </div>
        )}

        {(stage == "readyToPlay" || stage == "playing") && <div></div>}
      </header>
    </div>
  );
};

export default App;
