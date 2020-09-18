import * as functions from 'firebase-functions';
import getUserRoute from './routes/user/getUserRoute';
import addUserRoute from './routes/user/addUserRoute';
import createMockRoute from './routes/mock/createMockRoute';
import getRequestRoute from './routes/request/getRequests';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const getUser:functions.HttpsFunction = getUserRoute

export const addUser:functions.HttpsFunction = addUserRoute

export const createMock:functions.HttpsFunction = createMockRoute

export const getRequest: functions.HttpsFunction = getRequestRoute