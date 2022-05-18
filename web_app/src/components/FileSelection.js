import Button from "@mui/material/Button";
import FileUpload from "react-material-file-upload";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import ReactLoading from "react-loading";
import {
  analyzedFile,
  analyzeFile,
  cancelFile,
  selectFile,
} from "../redux/actions/fileActions";
const FileSelection = () => {
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.stage.stage);
  const selectedFileName = useSelector((state) => state.file.selectedFileName);

  const onFileChange = (event) => {
    // Update the state
    console.log(event[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event[0]);
    reader.onload = (e) => {
      let res = e.target.result;
      dispatch(selectFile(res, event[0].path, event[0].name));
    };
  };

  return (
    <div>
      <h3>Upload your audio!</h3>
      <FileUpload onChange={onFileChange} />
    </div>
  );
};

export default FileSelection;
