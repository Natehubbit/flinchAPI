import * as functions from 'firebase-functions'
import NotificationService from '../../services/NotificationService'
import PaymentService from '../../services/PaymentService'
import RequestService from '../../services/RequestService'
import { NotificationMessage } from '../../types/notification'
import { Request } from '../../types/request'

const onRequestRejectedTask = functions.firestore
  .document('requests/{id}')
  .onUpdate( async (snap,context) => {
    try {
      const { id } = context.params
      const request: Request = snap.after.data()
      const prevReq: Request = snap.before.data()
      const userToken = request.requestor?.token
      const celeb = request.celebrity?.name
      const isRejected = !!prevReq.response && 
        (
          prevReq.response.status === 'pending' &&
          request.response?.status === 'rejected'
        ) && 
        !!celeb
      console.log('REJECTED:: ',isRejected)
      if (isRejected) {
        console.log('Request ', JSON.stringify(request))
        console.log('Final Response ',JSON.stringify(request.response))
        console.log('Prev Response ',JSON.stringify(prevReq.response))
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
        console.log('REFUND DATA:: ', JSON.stringify(refunded))
        const isRefunded = !!refunded && 
          !!id
        console.log('REFUNDED:: ', isRefunded)
        const res = !!refunded && !!id &&
          await RequestService
            .update(id,{
              key: 'payment.refund',
              data:{
                refunded: true,
                id: refunded.transaction.id,
                trxRef: refunded.transaction.reference,
              }
            })
        console.log('REFUND RESPONSE:: ', JSON.stringify(res))
        res && await NotificationService.save([{
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
      return
    } catch (e) {
      console.log(e.message)
      return
    }
})

export default onRequestRejectedTask