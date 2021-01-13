import * as functions from 'firebase-functions';
import _ from 'lodash'
import { CHARGE_SUCCESS } from '../../config/constants';
import NotificationService from '../../services/NotificationService';
import RequestService from '../../services/RequestService';
import { NotificationMessage } from '../../types/notification';

const paymentCallbackRoute = functions.https.onRequest(async (request, response):Promise<any> => {
    try {
        const eventExists = !!request.body.event
        console.log('EVENT',JSON.stringify(request.body.event))
        if (!eventExists) {
            response.end()
            return
        }
        console.log('Blahb', JSON.stringify(request.body))
        if (request.body.event===CHARGE_SUCCESS) {
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
            }
        }
    } catch (error) {
        console.log(error.message)
    }
    response.end()
});
export default paymentCallbackRoute;