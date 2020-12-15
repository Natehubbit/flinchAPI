import { ExpoPushMessage } from 'expo-server-sdk'
import * as functions from 'firebase-functions'
import NotificationService from '../../services/NotificationService'
import UserService from '../../services/UserService'
import { Request } from '../../types/request'
import { User } from '../../types/user'

export const onRequestPlaced = functions.firestore
  .document('requests/{id}')
  .onUpdate( async (snap) => {
    const request: Request = snap.after.data()
    const prevReq: Request = snap.before.data()
    const prevPaid = prevReq.payment?.payed
    const paid = request.payment?.payed
    const isPaid = prevPaid !== paid
    const userId = request.requestor?.id
    const celeb = request.celebrity?.name
    if (!paid) return
    if (paid && isPaid) {
      const user: User|undefined = userId 
        ? await UserService.getUser(userId)
        : undefined
      if (user) {
        const msg: ExpoPushMessage = {
          to: user.token.data,
          title: 'Request Submitted',
          body: `${celeb} has received your request.`,
        }
        // TODO: CREATE MESSAGE FOR CELEBRITY.
        // REQUIRES CELEB TO HAVE A USER PROFILE.
        await NotificationService.send([msg])
      }
    }
})
