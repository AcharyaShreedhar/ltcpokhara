import { createActions } from "reduxsauce";

const { Types, Creators } = createActions({
  /*
   *** Please add redux functions which should do API calls here.
   */


// fetching all books
 fetchallbooksRequest: ["payload"],
 fetchallbooksSuccess: ["response"],
 fetchallbooksFailure: null,

 // fetch a book
 fetchbooksRequest: ["payload"],
 fetchbooksSuccess: ["response"],
 fetchbooksFailure: null,

 // Clearn all caches
 clearRequest: null,
});

export const PublicationTypes = Types;
export default Creators;
