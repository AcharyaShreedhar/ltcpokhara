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
  //   API_URL: equals(process.env.NODE_ENV, "production")
  //     ? "https://hcm.drivingsales.com/api/"
  //     : "https://qa.hcm.drivingsales.com/api/",
  //   S3_URL: "https://s3-us-west-2.amazonaws.com/",
  //   S3_API: equals(process.env.NODE_ENV, "production")
  //     ? "hcm.drivingsales.com-assets"
  //     : "hcm-qa.drivingsales.com-assets",
  API_URL: "http://localhost:4000/api/v1/",
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
  const loginByUsername = (payload) => api.post("auth/login", payload);

  const postAdminStaffSave = (payload) => api.post("staffs", payload);

  const postAdminNoticeSave = (payload) => api.post("notices", payload);

  const postAdminPublicationSave = (payload) =>
    api.post("publications", payload);

  const getAdminNotice = () => api.get("notices");
  const getAdminPublication = () => api.get("publications");
  const getAdminStaff = () => api.get("staffs");

  return {
    loginByUsername,

    postAdminStaffSave,
    postAdminNoticeSave,
    postAdminPublicationSave,

    getAdminNotice,
    getAdminPublication,
    getAdminStaff,
  };
};

export default {
  create,
};
