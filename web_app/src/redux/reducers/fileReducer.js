const fileReducer = (
  state = {
    selectedFile: null,
    selectedFilePath: null,
    selectedFileName: null,
    filePitches: [],
    fileWindowTime: null,
    successResponse: false,
  },
  action
) => {
  switch (action.type) {
    case "SELECT_FILE":
      console.log("file received", action.payload.selectedFilePath);
      let news = {
        ...state,
        selectedFile: action.payload.selectedFile,
        selectedFilePath: action.payload.selectedFilePath,
        selectedFileName: action.payload.selectedFileName,
      };
      console.log(news);
      return news;
    case "CANCEL_FILE":
      return {
        ...state,
        selectedFile: null,
        selectedFilePath: null,
        selectedFileName: null,
      };
    case "ANALYZED_FILE":
      return {
        ...state,
        fileWindowTime: action.payload.fileWindowTime,
        filePitches: action.payload.filePitches,
        successResponse: action.payload.successResponse,
      };

    default:
      return state;
  }
};

export default fileReducer;
