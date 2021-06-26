import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  /*
   *** Please add redux functions which should do API calls here.
   */


// fetching all downloads
 fetchalldownloadsRequest: ["payload"],
 fetchalldownloadsSuccess: ["response"],
 fetchalldownloadsFailure: null,


  // Clearn all caches
  clearRequest: null,
});

export const DownloadTypes = Types;
export default Creators;