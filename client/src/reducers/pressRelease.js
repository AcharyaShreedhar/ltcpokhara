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
    allpressreleaseData: action.response,
  });
};
const fetchallpressreleaseFailure = (state, action) => {
    state.merge({ ...state, status: "error" });
  };

  //fetch a pressrelease
const fetchpressreleaseRequest = (state, action) =>
state.merge({ ...state, token: "", status: "pending" });
const fetchpressreleaseSuccess = (state, action) => {
return state.merge({
  ...state,
  status: "done",
  pressreleaseData: action.response,
});
};
const fetchpressreleaseFailure = (state, action) => {
state.merge({ ...state, status: "error" });
};

const clearRequest = (state, action) =>
state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

 //Fetch allpress release
[PressReleaseTypes.FETCHALLPRESSRELEASE_REQUEST]: fetchallpressreleaseRequest,
[PressReleaseTypes.FETCHALLPRESSRELEASE_SUCCESS]: fetchallpressreleaseSuccess,
[PressReleaseTypes.FETCHALLPRESSRELEASE_FAILURE]: fetchallpressreleaseFailure,

//fetch press release
[PressReleaseTypes.FETCHPRESSRELEASE_REQUEST]: fetchpressreleaseRequest,
[PressReleaseTypes.FETCHPRESSRELEASE_SUCCESS]: fetchpressreleaseSuccess,
[PressReleaseTypes.FETCHPRESSRELEASE_FAILURE]: fetchpressreleaseFailure,

[PressReleaseTypes.CLEAR_REQUEST]: clearRequest,
});