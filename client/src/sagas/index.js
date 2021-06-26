import { takeEvery, takeLatest, all } from "redux-saga/effects";
import API from "../services/api";
import { AppTypes } from "../actions/app";
import { AdminTypes } from "../actions/admin";
import { PublicationTypes} from "../actions/publication";

import { loginRequest, logoutRequest } from "./app";
import {
  fetchalleventsRequest,
  addstaffRequest,
  addnoticeRequest,
  addpublicationRequest,
  fetchnoticeRequest,
  fetchpublicationRequest,
  fetchstaffRequest,
} from "./admin";
import {
  fetchallbooksRequest,
  fetchbooksRequest,
} from "./publication";

const api = API.create();

export default function* root() {
  yield all([
    takeLatest(AppTypes.LOGIN_REQUEST, loginRequest, api),
    takeLatest(AppTypes.LOGOUT_REQUEST, logoutRequest, api),

    takeLatest(AdminTypes.FETCHALLEVENTS_REQUEST, fetchalleventsRequest, api),
    takeLatest(AdminTypes.ADDSTAFF_REQUEST, addstaffRequest, api),
    takeLatest(AdminTypes.ADDNOTICE_REQUEST, addnoticeRequest, api),
    takeLatest(AdminTypes.ADDPUBLICATION_REQUEST, addpublicationRequest, api),

    takeLatest(AdminTypes.FETCHNOTICE_REQUEST, fetchnoticeRequest, api),
    takeLatest(
      AdminTypes.FETCHPUBLICATION_REQUEST,
      fetchpublicationRequest,
      api
    ),
    takeLatest(AdminTypes.FETCHSTAFF_REQUEST, fetchstaffRequest, api),
    takeLatest(PublicationTypes.FETCHALLBOOKS_REQUEST, fetchallbooksRequest, api),
    takeLatest(PublicationTypes.FETCHBOOKS_REQUEST, fetchbooksRequest, api),
  ]);
}
