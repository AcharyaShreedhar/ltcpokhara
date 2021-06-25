import { createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";
import { dropLast, prepend } from "ramda";
import { AppTypes } from "../actions/app";

const initialState = Immutable({
  status: "",
  token: "",
});

const loginRequest = (state, action) =>
  state.merge({ ...state, token: "", status: "pending" });
const loginSuccess = (state, action) => {
  const { token, user } = action.response;

  return state.merge({
    ...state,
    status: "done",
    token,
    user,
  });
};
const loginFailure = (state, action) => {
  state.merge({ ...state, status: "error" });
};

const logoutRequest = (state, action) =>
  state.merge({ ...state, status: "done" });
const logoutSuccess = (state, action) =>
  state.merge({ ...state, status: "done" });
const logoutFailure = (state, action) =>
  state.merge({ ...state, status: "error" });

const locationsRequest = (state, action) => {
  let locations = state.locations;

  locations = prepend(action.payload.route, locations);
  locations = dropLast(1, locations);
  return state.merge({ ...state, locations });
};

const clearRequest = (state, action) =>
  state.merge({ ...state, ...initialState });

export const reducer = createReducer(initialState, {
  [AppTypes.LOGIN_REQUEST]: loginRequest,
  [AppTypes.LOGIN_SUCCESS]: loginSuccess,
  [AppTypes.LOGIN_FAILURE]: loginFailure,

  [AppTypes.LOGOUT_REQUEST]: logoutRequest,
  [AppTypes.LOGOUT_SUCCESS]: logoutSuccess,
  [AppTypes.LOGOUT_FAILURE]: logoutFailure,

  [AppTypes.LOCATIONS_REQUEST]: locationsRequest,
  [AppTypes.CLEAR_REQUEST]: clearRequest,
});
