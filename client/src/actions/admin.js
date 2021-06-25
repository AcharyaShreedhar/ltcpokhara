import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  /*
   *** Please add redux functions which should do API calls here.
   */

  // -----------   Learn Page

  addstaffRequest: ["payload", "image"],
  addstaffSuccess: ["response"],
  addstaffFailure: null,

  addnoticeRequest: ["payload", "image"],
  addnoticeSuccess: ["response"],
  addnoticeFailure: null,

  addpublicationRequest: ["payload", "image"],
  addpublicationSuccess: ["response"],
  addpublicationFailure: null,

  fetchstaffRequest: null,
  fetchstaffSuccess: ['response'],
  fetchstaffFailure: null,

  fetchnoticeRequest: null,
  fetchnoticeSuccess: ['response'],
  fetchnoticeFailure: null,

  fetchpublicationRequest: null,
  fetchpublicationSuccess: ['response'],
  fetchpublicationFailure: null,

  // Clearn all caches
  clearRequest: null,
});

export const AdminTypes = Types;
export default Creators;
