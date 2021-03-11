import * as functions from 'firebase-functions'
import NotificationService from '../../services/NotificationService'
import { NotificationMessage } from '../../types/notification'
import { Request } from '../../types/request'

const onRequestFulfilledTask = functions.firestore
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
      const isFulfilled = !!prevReq.response && 
        (
          prevReq.response.status === 'pending' &&
          request.response?.status === 'approved'
        ) && 
        !!celeb
      console.log('FULLFILLED:: ',isFulfilled)
      if (isFulfilled) {
        console.log('USER TOKEN:: ', userToken)
        const msg: NotificationMessage[] = [{
            to: userToken||'',
            title: 'Request Fulfilled',
            body: `${celeb} fulfilled your request`,
            data: {id,request},
            read: false,
            sent: false,
            recipientId: request.requestor?.id||'',
            createdAt: Date.now()
        }]
        await NotificationService.save(msg)
      }
      return
    } catch (e) {
      console.log(e.message)
      return
    }
})

export default onRequestFulfilledTask