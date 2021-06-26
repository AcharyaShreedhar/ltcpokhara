import { put } from "redux-saga/effects";
import xmljs from "xml-js";

import { isNil } from "ramda";
import DownloadActions from "../actions/download";

export function* fetchalldownloadsRequest(api, action) {
    const { payload } = action;
    const payloaddata = isNil(payload) ? action : payload;
    const response = yield api.getDownloadsList(payloaddata);
  console.log('resp',response)
    if (response.ok) {
      yield put(DownloadActions.fetchalldownloadsSuccess(response.data));
    } else {
      yield put(DownloadActions.fetchalldownloadsFailure());
    }
  }