import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { DownloadTypes } from "../actions/download";

const initialState = Immutable({
  status: "",
});


// fetch alldownloads
const fetchalldownloadsRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const fetchalldownloadsSuccess = (state, action) => {
  return state.merge({
    ...state,
    status: "done",
    alldownloadsData: action.response,
  });
};
const fetchalldownloadsFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};

//fetch a download
const fetchdownloadsRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const fetchdownloadsSuccess = (state, action) => {
  return state.merge({
    ...state,
    status: "done",
    downloadsData: action.response,
  });
};
const fetchdownloadsFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};

const clearRequest = (state, action) =>
  state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

[DownloadTypes.FETCHALLDOWNLOADS_REQUEST]: fetchalldownloadsRequest,
[DownloadTypes.FETCHALLDOWNLOADS_SUCCESS]: fetchalldownloadsSuccess,
[DownloadTypes.FETCHALLDOWNLOADS_FAILURE]: fetchalldownloadsFailure,

[DownloadTypes.FETCHDOWNLOADS_REQUEST]: fetchdownloadsRequest,
[DownloadTypes.FETCHDOWNLOADS_SUCCESS]: fetchdownloadsSuccess,
[DownloadTypes.FETCHDOWNLOADS_FAILURE]: fetchdownloadsFailure,

[DownloadTypes.CLEAR_REQUEST]: clearRequest,
});