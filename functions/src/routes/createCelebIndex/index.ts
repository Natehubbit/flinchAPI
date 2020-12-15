import * as functions from 'firebase-functions';
import { db } from '../../config/firebase';
import SearchIndexService from '../../services/SearchIndexService';

const celebRef = db.collection('celebs')

const createCelebIndexRoute = functions.https.onRequest(async (request, response) => {
    try {
      const data = await celebRef.get()
      SearchIndexService
        .addObjects(data,'celebs')
    } catch (e) {
      console.log(JSON.stringify(e.message))
    }
    response.end()
});
export default createCelebIndexRoute;