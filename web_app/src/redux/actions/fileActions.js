export const SELECT_FILE = "SELECT_FILE";

export const selectFile = (
  selectedFile,
  selectedFilePath,
  selectedFileName
) => {
  return {
    type: SELECT_FILE,
    payload: { selectedFile, selectedFilePath, selectedFileName },
  };
};
export const CANCEL_FILE = "CANCEL_FILE";
export const cancelFile = () => {
  return {
    type: CANCEL_FILE,
  };
};
export const ANALYZED_FILE = "ANALYZED_FILE";
export const analyzedFile = (fileWindowTime, filePitches, successResponse) => {
  return {
    type: ANALYZED_FILE,
    payload: { fileWindowTime, filePitches, successResponse },
  };
};
export const ANALYZE_FILE = "ANALYZE_FILE";

export const analyzeFile = () => {
  return {
    type: ANALYZE_FILE,
  };
};
