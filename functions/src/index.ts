import * as functions from 'firebase-functions';
import getRequestRoute from './routes/request/getRequests';
import initPaymentRoute from './routes/payment/initializePayment';
import testRoute from './routes/test';
// import { onRequestPaidTask } from './backgroundTasks/onRequestPaid';
import { onRequestFulfilledTask } from './backgroundTasks/onRequestFulfilled';
import deleteUserRoute from './routes/auth/deleteUser';
import paymentCallbackRoute from './routes/payment/paymentCallback';
import createCelebIndexRoute from './routes/createCelebIndex';
import onCreateNotificationTask from './backgroundTasks/onCreateNotification';
import onCreateCelebTask from './backgroundTasks/onCreateCeleb';
import onDeleteCelebTask from './backgroundTasks/onDeleteCeleb';
import { onRequestRejectedTask } from './backgroundTasks/onRejectedRequest';

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
      .QueryDocumentSnapshot> = onCreateCelebTask

export const onDeleteCelebIndex: functions
  .CloudFunction<functions
    .firestore
      .QueryDocumentSnapshot> = onDeleteCelebTask

export const onCreateNotification: functions
  .CloudFunction<functions
    .firestore
      .QueryDocumentSnapshot> = onCreateNotificationTask

// export const onRequestPaid: functions
//   .CloudFunction<functions
//     .Change<functions
//       .firestore
//         .QueryDocumentSnapshot>> = onRequestPaidTask

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
      