import * as functions from 'firebase-functions';
import _ from 'lodash'
import { CHARGE_SUCCESS } from '../../config/constants';
import RequestService from '../../services/RequestService';

const paymentCallbackRoute = functions.https.onRequest(async (request, response) => {
    try {
        const eventExists = !!request.body.event
        !eventExists && response.end()
        if (request.body.event===CHARGE_SUCCESS) {
            const {
                data: {
                    id,
                    reference,
                    amount,
                    currency,
                    metadata: {
                        requestId
                    }
                },
            } = request.body
            const paid = await RequestService.pay(
                requestId,
                amount,
                id,
                reference,
                currency
            )
            paid
            ? response.send('Payment Successful, trxRef: '+reference)
            : response.send('Payment Failed')
        }
    } catch (error) {
        console.log(error.message)
    }
    response.end()
});
export default paymentCallbackRoute;