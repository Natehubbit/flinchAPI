import * as functions from 'firebase-functions'
import { ALGOLIA_INDEX_NAME, client } from '../../config/algolia';

const onCreateCelebIndex = functions.firestore
  .document('celeb/{id}')
  .onCreate((snap, context) => {
  // Get the celeb document
  const celeb = snap.data();

  // Add an 'objectID' field which Algolia requires
  celeb.objectID = context.params.id;

  // Write to the algolia index
  const index = client.initIndex(ALGOLIA_INDEX_NAME);
  return index.saveObject(celeb);
});

export default onCreateCelebIndex