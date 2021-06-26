import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { history } from "../reducers";
import { isNil } from "ramda";
import PublicationActions from "../actions/publication";

export function* fetchallbooksRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getBooksList(payloaddata);

  if (response.ok) {
    yield put(PublicationActions.fetchallbooksSuccess(response.data));
  } else {
    yield put(PublicationActions.fetchallbooksFailure());
  }
}

export function* fetchbooksRequest(api, action) {
  const  bookId  = action.payload

  const response = yield api.getBooks(bookId);
  
  if (response.ok) {
    yield put(
    PublicationActions.fetchbooksSuccess(response.data)
    );
  } else {
    yield put(PublicationActions.fetchbooksFailure());
  }
}
