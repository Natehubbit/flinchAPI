import * as functions from 'firebase-functions';
import _ from 'lodash'
import { CHARGE_SUCCESS } from '../../config/constants';
import RequestService from '../../services/requestService';

const paymentCallbackRoute = functions.https.onRequest(async (request, response) => {
    try {
        const eventExists = !!request.body.event
        eventExists && response.end()
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
            await RequestService.pay(
                requestId,
                amount,
                id,
                reference,
                currency
            )
        }
    } catch (error) {
        console.log(error.message)
    }
    // TODO: Get transaction info from paystack and write to request detail
    response.end()
});
export default paymentCallbackRoute;