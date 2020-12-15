import * as functions from 'firebase-functions'
import SearchIndexService from '../../services/SearchIndexService';

const onCreateCelebTask = functions.firestore
  .document('celeb/{id}')
  .onCreate((snap,context) => {
    return SearchIndexService
      .addObject(snap,'celebs',context.params.id)
});

export default onCreateCelebTask