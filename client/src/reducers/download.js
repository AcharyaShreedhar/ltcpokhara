import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { DownloadTypes } from "../actions/download";

const initialState = Immutable({
  status: "",
});


// fetch allbooks
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

const clearRequest = (state, action) =>
  state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

[DownloadTypes.FETCHALLDOWNLOADS_REQUEST]: fetchalldownloadsRequest,
[DownloadTypes.FETCHALLDOWNLOADS_SUCCESS]: fetchalldownloadsSuccess,
[DownloadTypes.FETCHALLDOWNLOADS_FAILURE]: fetchalldownloadsFailure,

[DownloadTypes.CLEAR_REQUEST]: clearRequest,
});