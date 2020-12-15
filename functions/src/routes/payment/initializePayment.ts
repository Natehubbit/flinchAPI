import * as functions from 'firebase-functions';
import PaymentService from '../../services/PaymentService';
import _ from 'lodash'

const initPaymentRoute = functions.https.onRequest(async (request, response) => {
    if (request.method !== 'POST'){
        response.status(400).json({
            data:null,
            msg:'Error'
        })
        response.end()
    }
    const data = request.body
    const paymentData = await PaymentService.initialize(data)
    response.status(200).json({
        data: paymentData
    })
    response.end()
});
export default initPaymentRoute;