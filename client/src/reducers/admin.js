import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { AdminTypes } from "../actions/admin";

const initialState = Immutable({
  // Refactored reducers
  status: "",
});



//events 

const fetchalleventsRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const fetchalleventsSuccess = (state, action) => {
  console.log("reducer", action.response);
  return state.merge({
    ...state,
    status: "done",
    alleventsData: action.response,
  });
};
const fetchalleventsFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};

// Add Staff
const addstaffRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const addstaffSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
  });
const addstaffFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

// Add Notice
const addnoticeRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const addnoticeSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
  });
const addnoticeFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

// Add Publication
const addpublicationRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const addpublicationSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
  });
const addpublicationFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

// Fetch Notices
const fetchnoticeRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });

const fetchnoticeSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
    programmes: action.response.data.notices.programmes,
    newsandnotice: action.response.data.notices.newsandnotice,
    pressrelease: action.response.data.notices.pressrelease,
  });
const fetchnoticeFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

// Fetch Staffs
const fetchstaffRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const fetchstaffSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
    staffs: action.response,
  });
const fetchstaffFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

// Fetch Publications
const fetchpublicationRequest = (state, action) =>
  state.merge({ ...state, status: "pending" });
const fetchpublicationSuccess = (state, action) =>
  state.merge({
    ...state,
    status: "done",
    books: action.response.data.publications.books,
    tors: action.response.data.publications.tors,
    downloads: action.response.data.publications.downloads,
  });
const fetchpublicationFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

const clearRequest = (state, action) =>
  state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {

  [AdminTypes.FETCHALLEVENTS_REQUEST]: fetchalleventsRequest,
  [AdminTypes.FETCHALLEVENTS_SUCCESS]: fetchalleventsSuccess,
  [AdminTypes.FETCHALLEVENTS_FAILURE]: fetchalleventsFailure,
  // add Staff
  [AdminTypes.ADDSTAFF_REQUEST]: addstaffRequest,
  [AdminTypes.ADDSTAFF_SUCCESS]: addstaffSuccess,
  [AdminTypes.ADDSTAFF_FAILURE]: addstaffFailure,

  [AdminTypes.ADDNOTICE_REQUEST]: addnoticeRequest,
  [AdminTypes.ADDNOTICE_SUCCESS]: addnoticeSuccess,
  [AdminTypes.ADDNOTICE_FAILURE]: addnoticeFailure,

  [AdminTypes.ADDPUBLICATION_REQUEST]: addpublicationRequest,
  [AdminTypes.ADDPUBLICATION_SUCCESS]: addpublicationSuccess,
  [AdminTypes.ADDPUBLICATION_FAILURE]: addpublicationFailure,

  [AdminTypes.FETCHNOTICE_REQUEST]: fetchnoticeRequest,
  [AdminTypes.FETCHNOTICE_SUCCESS]: fetchnoticeSuccess,
  [AdminTypes.FETCHNOTICE_FAILURE]: fetchnoticeFailure,

  [AdminTypes.FETCHSTAFF_REQUEST]: fetchstaffRequest,
  [AdminTypes.FETCHSTAFF_SUCCESS]: fetchstaffSuccess,
  [AdminTypes.FETCHSTAFF_FAILURE]: fetchstaffFailure,

  [AdminTypes.FETCHPUBLICATION_REQUEST]: fetchpublicationRequest,
  [AdminTypes.FETCHPUBLICATION_SUCCESS]: fetchpublicationSuccess,
  [AdminTypes.FETCHPUBLICATION_FAILURE]: fetchpublicationFailure,

  [AdminTypes.CLEAR_REQUEST]: clearRequest,
});
