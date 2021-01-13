import * as functions from 'firebase-functions'
import NotificationService from '../../services/NotificationService'
import { NotificationMessage } from '../../types/notification'
import { Request } from '../../types/request'

export const onRequestPaidTask = functions.firestore
  .document('requests/{id}')
  .onUpdate( async (snap,context) => {
    // const {eventId} = context
    const request: Request = snap.after.data()
    const prevReq: Request = snap.before.data()
    const prevPaid = prevReq.payment?.payed
    const paid = request.payment?.payed
    const isPaid = prevPaid !== paid
    const celeb = request.celebrity?.name
    const celebToken = request.celebrity?.token
    if (!paid) return
    if (paid && isPaid && celebToken) {
      const msg: NotificationMessage = {
        to: celebToken,
        title: 'Request Submitted',
        body: `${celeb} has received your request.`,
        read: false,
        sent: false,
        recipientId: request.requestor?.id||'',
        createdAt: Date.now()
      }
      await NotificationService.save([msg])
    }
})
