import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { history } from "../reducers";
import AppActions from "../actions/app";
import AdminActions from "../actions/admin";

export function* loginRequest(api, action) {
  const { payload } = action;

  const response = yield api.loginByUsername(payload);

  if (response.ok) {
    const { msg, token, user } = response.data.data;
    window.token = token;

    yield put(AppActions.loginSuccess({ token, user }));
    yield put(AdminActions.fetchnoticeRequest());
    yield put(AdminActions.fetchpublicationRequest());
    yield put(AdminActions.fetchstaffRequest());
    if (token !== "" && typeof token !== "undefined") {
      toast.success("Successfully Logged In!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      yield call(history.push, "/admin");
    } else {
      toast.error("Oops, username or password is wrong!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  } else {
    toast.error("Oops, username or password is wrong!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    yield put(AppActions.loginFailure());
  }
}

export function* logoutRequest(api, action) {
  yield put(AppActions.clearRequest());
  yield put(AppActions.logoutSuccess());
  yield call(history.push, "/home");
}
