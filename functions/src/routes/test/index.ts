import * as functions from 'firebase-functions';

const testRoute = functions.https.onRequest(async (request, response) => {
    response.send('test successful')
    console.log('hello')
    response.end()
});
export default testRoute;