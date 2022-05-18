import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  analyzedFIle,
  analyzeFile,
  cancelFile,
} from "../redux/actions/fileActions";
const FilePreview = () => {
  const dispatch = useDispatch();
  const selectedFileName = useSelector((state) => state.file.selectedFileName);
  const onFileUpload = () => {
    dispatch(analyzeFile());
  };

  const onFileCancel = () => {
    dispatch(cancelFile());
  };

  return (
    <div>
      <h3>File uploaded!</h3>

      <div>{selectedFileName}</div>

      <h3></h3>
      <Button variant="contained" onClick={onFileUpload}>
        Analyze!
      </Button>

      <span> </span>
      <Button variant="contained" color="error" onClick={onFileCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default FilePreview;
