import * as functions from 'firebase-functions'
import SearchIndexService from '../../services/SearchIndexService';

const onDeleteCelebIndexTask = functions.firestore
  .document('celebs/{id}')
  .onDelete((snap,context) => {
    const { id } = context.params
    const res = SearchIndexService
      .deleteObject(id,'celebs')
    console.log(res)
    return res
});

export default onDeleteCelebIndexTask