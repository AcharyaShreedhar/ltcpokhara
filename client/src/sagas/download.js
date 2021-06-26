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


  export function* adddownloadsRequest(api, action) {
    const { payload, attachment } = action;
  
    const downloads = payload.downloads.data;
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
  
    const response = yield api.postDownloadsSave(downloads);
  
    if (response.ok) {
      yield put(DownloadActions.adddownloadsSuccess());
    } else {
      yield put(DownloadActions.adddownloadsFailure());
    }
  }
  

