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

  //----------------- addpressrelease
  export function* addpressreleaseRequest(api, action) {
    const { payload, attachment } = action;
  
    const pressrelease = payload.pressrelease.data;
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
  
    const response = yield api.postPressReleaseSave(pressrelease);
  
    if (response.ok) {
      toast.success("सफलतापुर्वक प्रेस विज्ञप्ति प्रविष्ट भयो !!!!!", {
        position: toast.POSITION.TOP_CENTER,
      });
      yield put(PressReleaseActions.addpressreleaseSuccess());
    } else {
      toast.error(
        "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
        {
          position: toast.POSITION.TOP_CENTER,
        }
      );
      yield put(PressReleaseActions.addpressreleaseFailure());
    }
  }