import { admin } from "../config/firebase";

export default class AuthService {
  static async deleteUser (
    id:string
  ): Promise<boolean> {
    try {
      await admin
        .auth()
          .deleteUser(id)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
}