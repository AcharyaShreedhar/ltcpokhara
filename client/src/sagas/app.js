import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";
import { history } from "../reducers";
import AppActions from "../actions/app";
import AdminActions from "../actions/admin";

export function* loginRequest(api, action) {
  const { payload } = action;

  const response = yield api.loginByUsername(payload);

  if (response.ok) {
    const { user } = response.data;
    const { user_token } = user;
    window.token = user_token;
    yield put(AppActions.loginSuccess({ user_token, user }));
    yield put(AdminActions.fetchnoticeRequest());
    yield put(AdminActions.fetchpublicationRequest());
    yield put(AdminActions.fetchstaffRequest());
    if (user_token !== "" && typeof user_token !== "undefined") {
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
      toast.error("तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!", {
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
    toast.error("तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!", {
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
