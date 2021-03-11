import * as functions from 'firebase-functions'
import SearchIndexService from '../../services/SearchIndexService';

const onUpdateCelebIndexTask = functions.firestore
  .document('celebs/{id}')
  .onUpdate((snap,context) => {
    const { id } = context.params
    const data = snap.after
    const res = SearchIndexService
      .addObject(data,id,'celebs')
    console.log(res)
    return res
});

export default onUpdateCelebIndexTask