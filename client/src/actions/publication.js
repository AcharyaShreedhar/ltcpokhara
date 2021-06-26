import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  /*
   *** Please add redux functions which should do API calls here.
   */


// fetching all books
 fetchallbooksRequest: ["payload"],
 fetchallbooksSuccess: ["response"],
 fetchallbooksFailure: null,

 // Clearn all caches
 clearRequest: null,
});

export const PublicationTypes = Types;
export default Creators;
