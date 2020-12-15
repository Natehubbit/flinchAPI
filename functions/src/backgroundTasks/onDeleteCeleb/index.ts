import * as functions from 'firebase-functions'
import SearchIndexService from '../../services/SearchIndexService';

const onDeleteCelebTask = functions.firestore
  .document('celeb/{id}')
  .onDelete((snap,context) => {
    return SearchIndexService
      .deleteObject(context.params.id,'celebs')
});

export default onDeleteCelebTask