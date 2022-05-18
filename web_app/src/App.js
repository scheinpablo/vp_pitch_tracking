import logo from "./logo.svg";
import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import Button from "@mui/material/Button";
import FileUpload from "react-material-file-upload";
import axios from "axios";
import React, { Component } from "react";
import ReactLoading from "react-loading";
import Audio from "react-audioplayer";

class App extends Component {
  state = {
    // Initially, no file is selected
    stage: "selecting", //selecting, uploaded, analyzing, readyToPlay, playing
    selectedFile: null,
    successResponse: false,
    fileSampleRate: false,
    audioInstance: null,
    filePitches: [],
  };

  onSetInstance = (instance) => {
    this.setState({ ...this.state, audioInstance: instance });
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    console.log(event[0]);
    this.setState({
      ...this.state,
      selectedFile: event[0],
      stage: "uploaded",
    });
  };

  onFileCancel = () => {
    this.setState({ ...this.state, selectedFile: null, stage: "selecting" });
  };
  onFilePlay = () => {
    this.state.audioInstance.play();
    this.setState({ ...this.state, stage: "playing" });
  };

  onFileUpload = () => {
    this.setState({ ...this.state, stage: "analyzing" });
    const formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    fetch("http://127.0.0.1:8000/uploadfile/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonRes) => {
        let result = JSON.parse(jsonRes);
        console.log(result);
        console.log(result.pitches);
        this.setState({
          ...this.state,
          successResponse: true,
          fileSampleRate: result["sample_rate"],
          filePitches: result["pitches"],
          stage: "playing",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        this.setState({ ...this.state, stage: "selecting" });
      });
  };
  // Create an object of formData

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    const firstNote = MidiNumbers.fromNote("a0");
    const lastNote = MidiNumbers.fromNote("G9");
    return (
      <div className="App">
        <header className="App-header">
          {/* <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div> */}
          {this.state.stage == "selecting" && (
            <div>
              <h3>Upload your audio!</h3>
              <FileUpload onChange={this.onFileChange} />
            </div>
          )}

          {this.state.stage == "uploaded" && (
            <div>
              <h3>File uploaded!</h3>

              <div>{this.state.selectedFile.name}</div>

              <h3></h3>
              <Button variant="contained" onClick={this.onFileUpload}>
                Analyze!
              </Button>

              <span> </span>
              <Button
                variant="contained"
                color="error"
                onClick={this.onFileCancel}
              >
                Cancel
              </Button>
            </div>
          )}

          <h1></h1>
          {this.state.stage == "analyzing" && (
            <ReactLoading
              type={"balls"}
              color={"#ffffff"}
              height={64}
              width={100}
            />
          )}
          {this.state.successResponse && (
            <div>
              <h3>File analyzed!</h3>

              <div>{this.state.selectedFile.name}</div>

              <h3></h3>
              <Button variant="contained" onClick={this.onFilePlay}>
                Play
              </Button>

              <h3></h3>
              <Piano
                noteRange={{ first: firstNote, last: lastNote }}
                playNote={(midiNumber) => {
                  // Play a given note - see notes below
                }}
                stopNote={(midiNumber) => {
                  // Stop playing a given note - see notes below
                }}
                width={1500}
              />
            </div>
          )}

          {(this.state.stage == "readyToPlay" ||
            this.state.stage == "playing") && (
            <div>
              <h3></h3>
              <Audio
                width={600}
                height={400}
                autoPlay={true}
                playlist={[
                  {
                    name: this.state.selectedFile.name, // song name
                    src: URL.createObjectURL(this.state.selectedFile), // song source address
                  },
                ]}
              />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
