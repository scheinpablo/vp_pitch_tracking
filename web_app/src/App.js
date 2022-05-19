import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { useSelector } from "react-redux";
import FileSelection from "./components/FileSelection";
import FilePreview from "./components/FilePreview";
import AudioComponent from "./components/AudioComponent";
import PianoComponent from "./components/PianoComponent";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const selectedFileName = useSelector((state) => state.file.selectedFileName);
  const stage = useSelector((state) => state.stage.stage);
  const successResponse = useSelector((state) => state.file.successResponse);

  console.log(stage);
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
};

export default App;
