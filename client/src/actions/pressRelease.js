import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  /*
   *** Please add redux functions which should do API calls here.
   */

 

  // fetching all pressrelease
  fetchallpressreleaseRequest: ["payload"],
  fetchallpressreleaseSuccess: ["response"],
  fetchallpressreleaseFailure: null,

  //fetch pressrelease
  fetchpressreleaseRequest: ["payload"],
  fetchpressreleaseSuccess: ["response"],
  fetchpressreleaseFailure: null,

  //add a pressrelease
  addpressreleaseRequest: ["payload", "image"],
  addpressreleaseSuccess: ["response"],
  addpressreleaseFailure: null,  

    // Clearn all caches
    clearRequest: null,
});

export const PressReleaseTypes = Types;
export default Creators;
