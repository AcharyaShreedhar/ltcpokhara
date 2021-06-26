import { put } from "redux-saga/effects";
import xmljs from "xml-js";

import { isNil } from "ramda";
import DownloadActions from "../actions/download";

export function* fetchalldownloadsRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getDownloadsList(payloaddata);

  if (response.ok) {
    yield put(DownloadActions.fetchalldownloadsSuccess(response.data));
  } else {
    yield put(DownloadActions.fetchalldownloadsFailure());
  }
}

export function* fetchdownloadsRequest(api, action) {
  const downloadId = action.payload;

  const response = yield api.getDownloads(downloadId);

  if (response.ok) {
    yield put(DownloadActions.fetchdownloadsSuccess(response.data));
  } else {
    yield put(DownloadActions.fetchdownloadsFailure());
  }
}
