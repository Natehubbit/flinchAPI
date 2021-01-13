import * as functions from 'firebase-functions'
import NotificationService from '../../services/NotificationService';
import { NotificationMessage } from '../../types/notification';

const onCreateNotificationTask = functions.firestore
  .document('notifications/{id}')
  .onCreate(async(snap,context) => {
    try {
      const {id} = context.params
      const data: NotificationMessage = {
        ...snap.data() as NotificationMessage
      }
      if (!data.sent) {
        const tickets = await NotificationService.send([data])
        if (tickets) {
          for(const ticket of tickets ) {
            if (ticket.status==='ok') {
              await NotificationService.sent(id)
            }
          }
        }
        console.log('sent')
      } else console.log('not sent')
    } catch (e) {
      console.log(e.message)
    }
});

export default onCreateNotificationTask