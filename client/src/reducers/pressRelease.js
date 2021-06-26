import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { PressReleaseTypes } from "../actions/pressRelease";

const initialState = Immutable({
  status: "",
});


// fetch allpressrelease
const fetchallpressreleaseRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const fetchallpressreleaseSuccess = (state, action) => {
  return state.merge({
    ...state,
    status: "done",
    allbooksData: action.response,
  });
};
const fetchallpressreleaseFailure = (state, action) => {
    state.merge({ ...state, status: "error" });
  };

const clearRequest = (state, action) =>
state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

 //Fetch allbooks   
[PressReleaseTypes.FETCHALLPRESSRELEASE_REQUEST]: fetchallpressreleaseRequest,
[PressReleaseTypes.FETCHALLPRESSRELEASE_SUCCESS]: fetchallpressreleaseSuccess,
[PressReleaseTypes.FETCHALLPRESSRELEASE_FAILURE]: fetchallpressreleaseFailure,

[PressReleaseTypes.CLEAR_REQUEST]: clearRequest,
});