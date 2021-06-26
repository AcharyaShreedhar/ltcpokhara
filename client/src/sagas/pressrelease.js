import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { history } from "../reducers";
import { isNil } from "ramda";
import PressReleaseActions from "../actions/pressRelease";
import pressRelease from "../views/Notice/PressRelease";

//----------------fetchallpressrelease
export function* fetchallpressreleaseRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getPressReleaseList(payloaddata);

  if (response.ok) {
    yield put(PressReleaseActions.fetchallpressreleaseSuccess(response.data));
  } else {
    yield put(PressReleaseActions.fetchallpressreleaseFailure());
  }
}

//---------------fetchpressreleaseerquest
export function* fetchpressreleaseRequest(api, action) {
    const  pressreleaseId  = action.payload
  
    const response = yield api.getPressRelease(pressreleaseId);
    
    if (response.ok) {
      yield put(
      PressReleaseActions.fetchpressreleaseSuccess(response.data)
      );
    } else {
      yield put(PressReleaseActions.fetchpressreleaseFailure());
    }
  }