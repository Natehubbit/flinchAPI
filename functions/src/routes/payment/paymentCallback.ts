import * as functions from 'firebase-functions';
import _ from 'lodash'
import { CHARGE_SUCCESS, PAYSTACK_TEST_KEY } from '../../config/constants';
import NotificationService from '../../services/NotificationService';
import RequestService from '../../services/RequestService';
import { NotificationMessage } from '../../types/notification';
import crypto from 'crypto'

const paymentCallbackRoute = functions.https.onRequest(async (request, response):Promise<any> => {
    try {
        const isPost = request.method === 'POST'
        if (!isPost) return response.sendStatus(200)
        const eventExists = !!request.body.event
        console.log('EVENT',JSON.stringify(request.body))
        console.log('METHOD:: ', request.method)
        //validate event
        const hash = crypto
            .createHmac('sha512', PAYSTACK_TEST_KEY)
            .update(JSON.stringify(request.body))
            .digest('hex');
        const isValid = hash === request.headers['x-paystack-signature']
        console.log('IS VALID:: ',isValid)
        if (isValid) {
            if (!eventExists) return
            console.log('Blahb', JSON.stringify(request.body))
            if (request?.body?.event===CHARGE_SUCCESS) {
                const {
                    data: {
                        id,
                        reference,
                        amount,
                        currency,
                        metadata: {
                            requestId,
                            token: requestorToken,
                            celebToken,
                            data
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
                console.log('TOKEN: ',requestorToken)
                console.log('CELEB-TOKEN: ',celebToken)
                const celeb = data.celebrity.name
                console.log(paid)
                if (paid) {
                    const msg:NotificationMessage[] = [{
                        to: requestorToken,
                        title: 'Request Submitted',
                        body: `${celeb} has received your request.`,
                        data,
                        read: false,
                        sent: false,
                        recipientId:data.requestor.id,
                        createdAt: Date.now()
                    },{
                        to: celebToken,
                        title: 'New Request Received',
                        body: `You have received a new request.`,
                        data,
                        read: false,
                        sent: false,
                        recipientId:data.celebrity.id,
                        createdAt: Date.now()
                    }]
                    await NotificationService.save(msg)
                    return response.sendStatus(200)
                } else {
                    const msg:NotificationMessage[] = [{
                        to: requestorToken,
                        title: 'Submission Failed',
                        body: `${celeb} did not receive your request. Please try again.`,
                        data,
                        read: false,
                        sent: false,
                        recipientId: data.requestor.id,
                        createdAt: Date.now()
                    }]
                    await NotificationService.save(msg)
                    return response.sendStatus(400)
                }
            }
            return response.sendStatus(200)
        }
        return
    } catch (error) {
        console.log(error.message)
        return response.sendStatus(400)
    }
});
export default paymentCallbackRoute;