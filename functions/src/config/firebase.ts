import firebaseAdmin from 'firebase-admin';

import serviceAccount from './permissions.json';

const params = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  }

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(params),
})


export const admin = firebaseAdmin
export const db = admin.firestore()
export const store = admin.storage()