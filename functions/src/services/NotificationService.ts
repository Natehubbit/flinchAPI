import { Expo, ExpoPushTicket } from "expo-server-sdk";
import { db } from "../config/firebase";
import { NotificationMessage } from "../types/notification";

export default class NotificationService {
  static expo = new Expo()
  static notificationRef = db.collection('notifications')
  static async send (
    messages:NotificationMessage[]
  ):Promise<ExpoPushTicket[]|null> {
    try {
      const msgs = messages.filter(msg=>Expo.isExpoPushToken(msg.to))
      const chunks = this.expo.chunkPushNotifications(msgs);
      const tickets: ExpoPushTicket[] = [];
      for (const chunk of chunks) {
        try {
          const ticketChunk = await this.expo
            .sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (e) {
          console.error(e.message);
        }
      }
      console.log('sent')
      return tickets
    } catch (e) {
      console.log(JSON.stringify(e.message))
      return null
    }
  }

  static async save (
    msgs:NotificationMessage[]
  ):Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>[]|null> {
    try {
      console.log('saving notifications')
      const res = msgs.map(async msg=>{
        return await this.notificationRef.add(msg)
      })
      const data = await Promise.all(res)
      return data
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async sent (
    id:string
  ):Promise<boolean|null> {
    try {
      const updated = await this
        .notificationRef
        .doc(id)
        .update({
          sent:true
        })
      return !!updated
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

}