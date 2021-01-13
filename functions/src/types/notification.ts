import { ExpoPushMessage } from "expo-server-sdk";

export interface NotificationMessage extends ExpoPushMessage {
  sent:boolean;
  read:boolean;
  recipientId:string;
  createdAt:number;
}