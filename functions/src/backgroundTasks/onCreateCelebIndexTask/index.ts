import * as functions from 'firebase-functions'
import SearchIndexService from '../../services/SearchIndexService';

const onCreateCelebIndexTask = functions.firestore
  .document('celebs/{id}')
  .onCreate((snap,context) => {
    const { id } = context.params
    const res = SearchIndexService
      .addObject(snap,id,'celebs')
    console.log(res)
    return res
});

export default onCreateCelebIndexTask