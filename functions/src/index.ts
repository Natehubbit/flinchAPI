import * as functions from 'firebase-functions';
import getRequestRoute from './routes/request/getRequests';
import initPaymentRoute from './routes/payment/initializePayment';
import testRoute from './routes/test';
import deleteUserRoute from './routes/auth/deleteUser';
import paymentCallbackRoute from './routes/payment/paymentCallback';
import createCelebIndexRoute from './routes/createCelebIndex';
import onCreateNotificationTask from './backgroundTasks/onCreateNotification';
import onRequestRejectedTask from './backgroundTasks/onRejectedRequest';
import onRequestFulfilledTask from './backgroundTasks/onRequestFulfilled';
import onCreateCelebIndexTask from './backgroundTasks/onCreateCelebIndexTask';
import onDeleteCelebIndexTask from './backgroundTasks/onDeleteCelebIndexTask';

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

// Auth
export const deleteUser: functions.HttpsFunction = deleteUserRoute

// Background tasks
export const onCreateCelebIndex: functions
  .CloudFunction<functions
    .firestore
      .QueryDocumentSnapshot> = onCreateCelebIndexTask

export const onDeleteCelebIndex: functions
  .CloudFunction<functions
    .firestore
      .QueryDocumentSnapshot> = onDeleteCelebIndexTask

export const onCreateNotification: functions
  .CloudFunction<functions
    .firestore
      .QueryDocumentSnapshot> = onCreateNotificationTask

export const onRequestFulfilled: functions
  .CloudFunction<functions
    .Change<functions
      .firestore
        .QueryDocumentSnapshot>> = onRequestFulfilledTask

export const onRequestRejected: functions
.CloudFunction<functions
  .Change<functions
    .firestore
      .QueryDocumentSnapshot>> = onRequestRejectedTask
      