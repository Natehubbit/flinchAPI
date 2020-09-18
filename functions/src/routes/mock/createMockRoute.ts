import * as functions from 'firebase-functions';
import MockService from '../../services/mockService';

const createMockRoute = functions.https.onRequest( async (request, response) => {
    MockService.create()
    response.status(201).end()
});

export default createMockRoute;