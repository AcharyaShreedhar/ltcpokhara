import { put } from "redux-saga/effects";
import xmljs from "xml-js";

import { isNil } from "ramda";
import AdminActions from "../actions/admin";


export function* fetchalleventsRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getEventsList(payloaddata);
  if (response.ok) {
    yield put(
      AdminActions.fetchalleventsSuccess(response.data)
    );
  } else {
    yield put(AdminActions.fetchalleventsFailure());
  }
}

export function* fetcheventsRequest(api, action) {
  const eventId = action.payload;

  const response = yield api.getEvents(eventId);
  if (response.ok) {
    yield put(
      AdminActions.fetcheventsSuccess(response.data)
    );
  } else {
    yield put(AdminActions.fetcheventsFailure());
  }
}


export function* addstaffRequest(api, action) {
  const { payload, attachment } = action;

  const staff = payload.staff.data;
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

  const response = yield api.postAdminStaffSave(staff);

  if (response.ok) {
    yield put(AdminActions.addstaffSuccess());
  } else {
    yield put(AdminActions.addstaffFailure());
  }
}

export function* addnoticeRequest(api, action) {
  const { payload, attachment } = action;

  const notice = payload.notice.data;
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

  const response = yield api.postAdminNoticeSave(notice);

  if (response.ok) {
    yield put(AdminActions.addnoticeSuccess());
  } else {
    yield put(AdminActions.addnoticeFailure());
  }
}

export function* addpublicationRequest(api, action) {
  const { payload, attachment } = action;

  const publication = payload.publication.data;
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

  const response = yield api.postAdminPublicationSave(publication);

  if (response.ok) {
    yield put(AdminActions.addpublicationSuccess());
  } else {
    yield put(AdminActions.addpublicationFailure());
  }
}

export function* fetchnoticeRequest(api, action) {
  const response = yield api.getAdminNotice();
  if (response.ok) {
    yield put(AdminActions.fetchnoticeSuccess(response.data));
  } else {
    yield put(AdminActions.fetchnoticeFailure());
  }
}

export function* fetchpublicationRequest(api, action) {
  const response = yield api.getAdminPublication();
  if (response.ok) {
    yield put(AdminActions.fetchpublicationSuccess(response.data));
  } else {
    yield put(AdminActions.fetchpublicationFailure());
  }
}

export function* fetchstaffRequest(api, action) {
  const response = yield api.getAdminStaff();
  if (response.ok) {
    yield put(AdminActions.fetchstaffSuccess(response.data));
  } else {
    yield put(AdminActions.fetchstaffFailure());
  }
}
