import * as functions from 'firebase-functions'
import NotificationService from '../../services/NotificationService'
import PaymentService from '../../services/PaymentService'
import RequestService from '../../services/RequestService'
import { NotificationMessage } from '../../types/notification'
import { Request } from '../../types/request'

export const onRequestRejectedTask = functions.firestore
  .document('requests/{id}')
  .onUpdate( async (snap,context) => {
    try {
      const { id } = context.params
      const request: Request = snap.after.data()
      const prevReq: Request = snap.before.data()
      const userToken = request.requestor?.token
      const celeb = request.celebrity?.name
      console.log('Request ', JSON.stringify(request))
      console.log('Init Response ',JSON.stringify(request.response))
      console.log('Prev Response ',JSON.stringify(prevReq.response))
      const isResponse = !!prevReq.response && 
        (
          prevReq.response.status === 'pending' &&
          request.response?.status === 'rejected'
        ) && 
        !!celeb
      console.log('REJECTED:: ',isResponse)
      if (isResponse) {
        console.log('USER TOKEN:: ', userToken)
        const msg: NotificationMessage[] = [{
            to: userToken||'',
            title: 'Request Rejected',
            body: `${celeb} rejected your request`,
            data: {id,request},
            read: false,
            sent: false,
            recipientId: request.requestor?.id||'',
            createdAt: Date.now()
        }]
        await NotificationService.save(msg)
        const refunded = await PaymentService.refund({
          transaction: request.payment?.trxRef||''
        })
        !!refunded && 
        request.id &&
          await RequestService
            .update(request.id,{data:{
              payment: {
                refund: {
                  refunded: true,
                  id: refunded.transaction.id,
                  trxRef: refunded.transaction.reference,
                }
              } as any
            }})
        !!refunded && await NotificationService.save([{
          to: userToken||'',
          title: 'Request Refunded',
          body: `Your request to ${celeb} has been refunded.`,
          data: {id,request},
          read: false,
          sent: false,
          recipientId: request.requestor?.id||'',
          createdAt: Date.now()
        }])
      }
    } catch (e) {
      console.log(e.message)
    }
})
