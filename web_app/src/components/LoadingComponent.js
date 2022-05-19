import { analyzedFile, selectedFile } from "../redux/actions/fileActions";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import { dataURLtoFile } from "../redux/selectedFileStorage";
const LoadingComponent = () => {
  const dispatch = useDispatch();
  const selectedFileName = useSelector((state) => state.file.selectedFileName);
  const selectedFile = useSelector((state) => state.file.selectedFile);

  useEffect(() => {
    const formData = new FormData();
    let file = dataURLtoFile(selectedFile, selectedFileName);
    console.log("file:  ", file);
    formData.append("file", file, selectedFileName);
    fetch("http://127.0.0.1:8000/uploadfile/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((jsonRes) => {
        let result = JSON.parse(jsonRes);

        dispatch(
          analyzedFile(
            result["window_ms"],
            result["pitches"],
            true
          )
        );
      })
      .catch((error) => {
        dispatch(analyzedFile(null, null, false));
        console.error("Error:", error);
      });
  }, []); 

  return (
    <ReactLoading type={"balls"} color={"#ffffff"} height={64} width={100} />
  );
};
export default LoadingComponent;
