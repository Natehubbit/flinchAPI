import * as functions from 'firebase-functions';
// import createMockRoute from './routes/mock/createMockRoute';
import getRequestRoute from './routes/request/getRequests';
import initPaymentRoute from './routes/payment/initializePayment';
import testRoute from './routes/test';
import paymentCallbackRoute from './routes/payment/paymentCallback';
import onCreateCelebIndex from './backgroundTasks/onCreateCelebIndex';
import createCelebIndexRoute from './routes/createCelebIndex';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const test: functions.HttpsFunction = testRoute

export const getRequest: functions.HttpsFunction = getRequestRoute

// Initialize payment for paystack
export const initializePayment: functions.HttpsFunction = initPaymentRoute

// Triggered callback for paystack paymemnt
export const paymentCallback: functions.HttpsFunction = paymentCallbackRoute

// Create search indices for celebs
export const createCelebIndex: functions.HttpsFunction = createCelebIndexRoute

// Background tasks
export const onCelebCreated: functions
  .CloudFunction<functions
    .firestore
    .QueryDocumentSnapshot> = onCreateCelebIndex