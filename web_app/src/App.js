import logo from "./logo.svg";
import "./App.css";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import axios from "axios";
import React, { Component } from "react";
class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  onFileUpload = () => {
    const formData = new FormData();

    formData.append("file", this.state.selectedFile, this.state.selectedFile.name);

    fetch("http://127.0.0.1:8000/uploadfile/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
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
          <h3>Upload your audio!</h3>
          <div>
            <input type="file" onChange={this.onFileChange} />
            <button onClick={this.onFileUpload}>Upload!</button>
          </div>
          <h1></h1>
          <div>
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
        </header>
      </div>
    );
  }
}

export default App;
