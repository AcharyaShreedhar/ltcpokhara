import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { PublicationTypes } from "../actions/publication";

const initialState = Immutable({
  status: "",
});


// fetch allbooks
const fetchallbooksRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const fetchallbooksSuccess = (state, action) => {
  return state.merge({
    ...state,
    status: "done",
    allbooksData: action.response,
  });
};
const fetchallbooksFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};

const clearRequest = (state, action) =>
  state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

 //Fetch allbooks   
[PublicationTypes.FETCHALLBOOKS_REQUEST]: fetchallbooksRequest,
[PublicationTypes.FETCHALLBOOKS_SUCCESS]: fetchallbooksSuccess,
[PublicationTypes.FETCHALLBOOKS_FAILURE]: fetchallbooksFailure,

[PublicationTypes.CLEAR_REQUEST]: clearRequest,
});