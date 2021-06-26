import { takeEvery, takeLatest, all } from "redux-saga/effects";
import API from "../services/api";
import { AppTypes } from "../actions/app";
import { AdminTypes } from "../actions/admin";
import { PublicationTypes} from "../actions/publication";
import { DownloadTypes} from "../actions/download";

import { loginRequest, logoutRequest } from "./app";
import {
  fetchalleventsRequest,
  fetcheventsRequest,
  addeventsRequest,
  updateeventsRequest,
  deleteeventsRequest,
  fetchallstaffRequest,
  fetchstaffRequest,
  addstaffRequest,
  updatestaffRequest,
  addnoticeRequest,
  addpublicationRequest,
  fetchnoticeRequest,
  fetchpublicationRequest,
  
} from "./admin";
import {
  fetchallbooksRequest,
  fetchbooksRequest,
  addbooksRequest,
  fetchallnirdesikaRequest,
  fetchnirdesikaRequest,
} from "./publication";
import {
  fetchalldownloadsRequest,
  fetchdownloadsRequest,
} from "./download";

const api = API.create();

export default function* root() {
  yield all([
    takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(AppTypes.LOGOUT_REQUEST, logoutRequest, api),

    takeLatest(AdminTypes.FETCHALLEVENTS_REQUEST, fetchalleventsRequest, api),
    takeLatest(AdminTypes.FETCHEVENTS_REQUEST, fetcheventsRequest, api),
    takeLatest(AdminTypes.ADDEVENTS_REQUEST, addeventsRequest, api),
    takeLatest(AdminTypes.UPDATEEVENTS_REQUEST, updateeventsRequest, api),
    takeLatest(AdminTypes.DELETEEVENTS_REQUEST, deleteeventsRequest, api),
    takeLatest(AdminTypes.FETCHALLSTAFF_REQUEST, fetchallstaffRequest, api),
    takeLatest(AdminTypes.FETCHSTAFF_REQUEST, fetchstaffRequest, api),
    takeLatest(AdminTypes.ADDSTAFF_REQUEST, addstaffRequest, api),
    takeLatest(AdminTypes.UPDATESTAFF_REQUEST, updatestaffRequest, api),
    takeLatest(AdminTypes.ADDNOTICE_REQUEST, addnoticeRequest, api),
    takeLatest(AdminTypes.ADDPUBLICATION_REQUEST, addpublicationRequest, api),

    takeLatest(AdminTypes.FETCHNOTICE_REQUEST, fetchnoticeRequest, api),
    takeLatest(
      AdminTypes.FETCHPUBLICATION_REQUEST,
      fetchpublicationRequest,
      api
    ),
    takeLatest(PublicationTypes.FETCHALLBOOKS_REQUEST, fetchallbooksRequest, api),
    takeLatest(PublicationTypes.FETCHBOOKS_REQUEST, fetchbooksRequest, api),
    takeLatest(PublicationTypes.ADDBOOKS_REQUEST, addbooksRequest, api),
    takeLatest(PublicationTypes.FETCHALLNIRDESIKA_REQUEST, fetchallnirdesikaRequest, api),
    takeLatest(PublicationTypes.FETCHNIRDESIKA_REQUEST, fetchnirdesikaRequest, api),
    takeLatest(DownloadTypes.FETCHALLDOWNLOADS_REQUEST, fetchalldownloadsRequest, api),
    takeLatest(DownloadTypes.FETCHDOWNLOADS_REQUEST, fetchdownloadsRequest, api),
  ]);
}
