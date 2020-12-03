import * as functions from 'firebase-functions';
import { ALGOLIA_INDEX_NAME, client } from '../../config/algolia';
import { db } from '../../config/firebase';

const celebRef = db.collection('celebs')

const createCelebIndexRoute = functions.runWith({
  timeoutSeconds: 540
}).https.onRequest(async (request, response) => {
    try {
      const data = await celebRef.get()
      const arr = data.docs.map(d=>{
        const celeb = d.data()
        celeb.objectID = d.id;
        return celeb
      })
      const index = client.initIndex(ALGOLIA_INDEX_NAME);
      index.saveObjects(arr,(err:any,content:any)=>{
        if (err) {
          response.status(500).send(
            JSON.stringify(err.message)
          );
        }
        else {
          response.status(200).send(JSON.stringify(content));
        }
      });
    } catch (e) {
      console.log(JSON.stringify(e.message))
      response.send('bye')
    }
    response.end()
});
export default createCelebIndexRoute;