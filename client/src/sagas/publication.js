import { call, put } from "redux-saga/effects";
import { toast } from "react-toastify";

import { history } from "../reducers";
import { isNil } from "ramda";
import PublicationActions from "../actions/publication";
import Books from "../views/Publications/Books";

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

//add books
export function* addbooksRequest(api, action) {
  const { payload, attachment } = action;

  const books = payload.books.data;
  //   if (!isNil(attachment)) {
  //     const _payload = {
  //       attachment_hash: null,
  //       file: attachment,
  //     };
  //     const res = yield api.getS3Info();

  //     if (res.ok) {
  //       // eslint-disable-next-line no-undef
  //       const formData = new FormData();
  //       for (const key in res.data.inputs) {
  //         formData.append(key, res.data.inputs[key]);
  //       }
  //       formData.set("Content-Type", _payload.file.type);
  //       formData.append(
  //         "key",
  //         `attachments/${_payload.attachment_hash}/${_payload.file.name}`
  //       );
  //       formData.append("file", _payload.file);
  //       const response = yield api.fileUpload(formData);

  //       if (response.ok) {
  //         const data = xmljs.xml2json(response.data, {
  //           compact: true,
  //           ignoreDeclaration: true,
  //         });
  //         const url = JSON.parse(data).PostResponse.Location._text;
  //         payload.document.data.attachment = url;
  //       }
  //     }
  //   }

  const response = yield api.postPublicationBooksSave(books);

  if (response.ok) {
    yield put(PublicationActions.addbooksSuccess());
  } else {
    yield put(PublicationActions.addbooksFailure());
  }
}

export function* fetchallnirdesikaRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getNirdesikaList(payloaddata);

  if (response.ok) {
    yield put(PublicationActions.fetchallnirdesikaSuccess(response.data));
  } else {
    yield put(PublicationActions.fetchallnirdesikaFailure());
  }
}