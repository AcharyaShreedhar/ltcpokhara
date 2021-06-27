import xmljs from "xml-js";
import { toast } from "react-toastify";
import { isNil } from "ramda";
import AdminActions from "../actions/admin";
import { call, put } from "redux-saga/effects";
import { history } from "../reducers";

export function* fetchalleventsRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getEventsList(payloaddata);
  if (response.ok) {
    yield put(AdminActions.fetchalleventsSuccess(response.data));
  } else {
    yield put(AdminActions.fetchalleventsFailure());
  }
}

export function* fetcheventsRequest(api, action) {
  const eventId = action.payload;

  const response = yield api.getEvents(eventId);
  if (response.ok) {
    yield put(AdminActions.fetcheventsSuccess(response.data));
  } else {
    yield put(AdminActions.fetcheventsFailure());
  }
}

export function* addeventsRequest(api, action) {
  const { payload, attachment } = action;

  const staff = payload.events.data;
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

  const response = yield api.postAdminEventsSave(staff);

  if (response.ok) {
    toast.success("सफलतापुर्वक कार्यक्रम प्रविष्ट भयो !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield put(AdminActions.addeventsSuccess());
  } else {
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    yield put(AdminActions.addeventsFailure());
  }
}

//update events

export function* updateeventsRequest(api, action) {
  const { payload, eventId } = action;

  const response = yield api.postAdminEventsUpdate(
    payload.events.data,
    eventId
  );

  if (response.ok) {
    toast.success("सफलतापुर्वक कार्यक्रम पुनः प्रविष्ट भयो !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield fetchalleventsRequest(api, {
      name: "events_title",
      page: 0,
      perPage: 10,
    });
    yield call(history.push, "/suchana/eventslist");
    yield put(AdminActions.updateeventsSuccess(response.data));
  } else {
    yield put(AdminActions.updateeventsFailure());
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  }
}

// Delete Events
export function* deleteeventsRequest(api, action) {
  const { payload } = action;

  const response = yield api.postAdminEventsDelete(payload);

  if (response.ok) {
    toast.success("सफलतापुर्वक कार्यक्रम हटाईयो !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield fetchalleventsRequest(api, {
      name: "event_title",
      page: 0,
      perPage: 10,
    });
    yield put(AdminActions.deleteeventsSuccess(response.data));
  } else {
    yield put(AdminActions.deleteeventsFailure());
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  }
}

export function* fetchallstaffRequest(api, action) {
  const { payload } = action;
  const payloaddata = isNil(payload) ? action : payload;
  const response = yield api.getStaffList(payloaddata);

  if (response.ok) {
    yield put(AdminActions.fetchallstaffSuccess(response.data));
  } else {
    yield put(AdminActions.fetchallstaffFailure());
  }
}

export function* fetchstaffRequest(api, action) {
  const staffId = action.payload;

  const response = yield api.getEvents(staffId);
  if (response.ok) {
    yield put(AdminActions.fetchstaffSuccess(response.data));
  } else {
    yield put(AdminActions.fetchstaffFailure());
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
    toast.success("सफलतापुर्वक स्टाफ प्रविष्ट भयो !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield put(AdminActions.addstaffSuccess());
  } else {
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
    yield put(AdminActions.addstaffFailure());
  }
}

//update staff

export function* updatestaffRequest(api, action) {
  const { payload, staffId } = action;

  const response = yield api.postAdminStaffUpdate(payload.staff.data, staffId);

  if (response.ok) {
    toast.success("सफलतापुर्वक स्टाफ पुनः प्रविष्ट भयो !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield fetchallstaffRequest(api, {
      name: "staff_name",
      page: 0,
      perPage: 10,
    });
    yield call(history.push, "/about/stafflist");
    yield put(AdminActions.updatestaffSuccess(response.data));
  } else {
    yield put(AdminActions.updatestaffFailure());
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
  }
}

// Delete staff
export function* deletestaffRequest(api, action) {
  const { payload } = action;

  const response = yield api.postAdminStaffDelete(payload);

  if (response.ok) {
    toast.success("सफलतापुर्वक स्टाफ हटाईयो !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield fetchallstaffRequest(api, {
      name: "staff_name",
      page: 0,
      perPage: 10,
    });
    yield put(AdminActions.deletestaffSuccess(response.data));
  } else {
    yield put(AdminActions.deletestaffFailure());
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
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
    toast.success("सफलतापुर्वक सुचना सम्प्रेषण भयो  !!!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
    yield put(AdminActions.fetchnoticeSuccess(response.data));
  } else {
    toast.error(
      "तपाईको कार्य सफल हुन सकेन.. कृपया पुनः प्रयास गर्नुहोला !!!!",
      {
        position: toast.POSITION.TOP_CENTER,
      }
    );
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
