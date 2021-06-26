/**
 * We will follow the following rules to name API functions.
 * prefix 1: type of http request such as get, post, delete.
 * prefix 2: section name such as admin
 * samples: postAdminStaffSave
 */
import apisauce from "apisauce";
import { equals, isNil, isEmpty } from "ramda";
import { store } from "../reducers";
import AppActions from "../actions/app";

const Config = {
  API_URL: "http://localhost:3001/api/v1/",
};

// const authenticated = (api) => {
//   api.setHeader("Authorization", "Bearer " + window.token);

//   return api;
// };

const naviMonitor = (response) => {
  if (equals(response.status, 401)) {
    store.dispatch(AppActions.logoutRequest());
    console.log("Your token has been expired.", response.config.url);
  }
};

const create = (baseURL = Config.API_URL) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // 50 second timeout...
    timeout: 50000,
  });

  const s3API = apisauce.create({
    baseURL: Config.S3_URL,
    headers: {
      Accept: "application/xml",
      "Content-Type": "multipart/form-data",
    },
    // 50 second timeout...
    timeout: 50000,
  });

  api.addMonitor(naviMonitor);

  // Login API
  const loginByUsername = (payload) => api.post("users/login", payload);

  //EVENTS
  const getEventsList = (payload) => api.post("eventsList", payload);

  const getEvents = (eventId) => api.get(`events/${eventId}`);

  const postAdminEventsSave = (payload) => api.post("events", payload);

  const postAdminEventsUpdate = (payload, eventId) =>
    api.put(`events/${eventId}`, payload);

  const postAdminEventsDelete = (eventId) => api.delete(`events/${eventId}`);

  const getStaffList = (payload) => api.post("staffList", payload);

  const getStaff = (staffId) => api.get(`staffs/${staffId}`);

  const postAdminStaffSave = (payload) => api.post("staffs", payload);

  const postAdminStaffUpdate = (payload, staffId) =>
    api.put(`staffs/${staffId}`, payload);

  const postAdminStaffDelete = (staffId) => api.delete(`staffs/${staffId}`);

  const postAdminNoticeSave = (payload) => api.post("notices", payload);

  const postAdminPublicationSave = (payload) =>
    api.post("publications", payload);


    const getPressReleaseList = (payload) => api.post("pressReleaseList", payload);

  

  const getAdminNotice = () => api.get("notices");
  const getAdminPublication = () => api.get("publications");
  const getBooksList = (payload) => api.post("booksList", payload);

  const getBooks = (bookId) => api.get(`books/${bookId}`);
  const postPublicationBooksSave = (payload) => api.post("books", payload);
  const getNirdesikaList = (payload) =>
    api.post("nirdeshikakaryabidhiList", payload);
  const getNirdesika = (nirdeshikaId) =>
    api.get(`nideshikakaryabidhi/${nirdeshikaId}`);
  const getDownloadsList = (payload) => api.post("downloadsList", payload);
  const getDownloads = (downloadId) => api.get(`downloads/${downloadId}`);
  const postDownloadsSave = (payload) =>api.post("downloads", payload);

  return {
    loginByUsername,

    getEventsList,
    getEvents,
    postAdminEventsSave,
    postAdminEventsUpdate,
    postAdminEventsDelete,
    getStaffList,
    getStaff,
    postAdminStaffSave,
    postAdminStaffUpdate,
    postAdminStaffDelete,
    postAdminNoticeSave,
    postAdminPublicationSave,

    getAdminNotice,
    getAdminPublication,
    getBooksList,
    getBooks,
    postPublicationBooksSave,
    getNirdesikaList,
    getNirdesika,
    getDownloadsList,
    getDownloads,
    postDownloadsSave,

    getPressReleaseList
  };
};

export default {
  create,
};
