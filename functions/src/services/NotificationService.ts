import { Expo, ExpoPushMessage } from "expo-server-sdk";

export default class NotificationService {
  static expo = new Expo()
  
  static async send (
    messages:ExpoPushMessage[]
  ):Promise<void> {
    try {
      const msgs = messages.filter(msg=>Expo.isExpoPushToken(msg.to))
      const chunks = this.expo.chunkPushNotifications(msgs);
      const tickets = [];
      for (const chunk of chunks) {
        try {
          const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error.message);
        }
      }
    } catch (e) {
      console.log(JSON.stringify(e.message))
    }
  }

}