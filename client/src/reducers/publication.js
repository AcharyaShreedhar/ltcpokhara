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
//fetch a book
const fetchbooksRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const fetchbooksSuccess = (state, action) => {
  return state.merge({
    ...state,
    status: "done",
    booksData: action.response,
  });
};
const fetchbooksFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};
//Add books
const addbooksRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const addbooksSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
  });
const addbooksFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

  // fetch allnirdesika
const fetchallnirdesikaRequest = (state, action) =>
state.merge({ ...state, token: "", status: "pending" });
const fetchallnirdesikaSuccess = (state, action) => {
return state.merge({
  ...state,
  status: "done",
  allnirdesikaData: action.response,
});
};
const fetchallnirdesikaFailure = (state, action) => {
state.merge({ ...state, status: "error" });
};
//fetch a nirdesika
const fetchnirdesikaRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const fetchnirdesikaSuccess = (state, action) => {
  return state.merge({
    ...state,
    status: "done",
    nirdesikaData: action.response,
  });
};
const fetchnirdesikaFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};

const clearRequest = (state, action) =>
  state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

 //Fetch allbooks   
[PublicationTypes.FETCHALLBOOKS_REQUEST]: fetchallbooksRequest,
[PublicationTypes.FETCHALLBOOKS_SUCCESS]: fetchallbooksSuccess,
[PublicationTypes.FETCHALLBOOKS_FAILURE]: fetchallbooksFailure,
//fetch a book
[PublicationTypes.FETCHBOOKS_REQUEST]: fetchbooksRequest,
[PublicationTypes.FETCHBOOKS_SUCCESS]: fetchbooksSuccess,
[PublicationTypes.FETCHBOOKS_FAILURE]: fetchbooksFailure,
//Add books
[PublicationTypes.ADDBOOKS_REQUEST]: addbooksRequest,
[PublicationTypes.ADDBOOKS_SUCCESS]: addbooksSuccess,
[PublicationTypes.ADDBOOKS_FAILURE]: addbooksFailure,

//Fetch allnirdesika  
[PublicationTypes.FETCHALLNIRDESIKA_REQUEST]: fetchallnirdesikaRequest,
[PublicationTypes.FETCHALLNIRDESIKA_SUCCESS]: fetchallnirdesikaSuccess,
[PublicationTypes.FETCHALLNIRDESIKA_FAILURE]: fetchallnirdesikaFailure,
//Fetch allnirdesika  
[PublicationTypes.FETCHNIRDESIKA_REQUEST]: fetchnirdesikaRequest,
[PublicationTypes.FETCHNIRDESIKA_SUCCESS]: fetchnirdesikaSuccess,
[PublicationTypes.FETCHNIRDESIKA_FAILURE]: fetchnirdesikaFailure,

[PublicationTypes.CLEAR_REQUEST]: clearRequest,
});