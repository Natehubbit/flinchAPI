import { UserRecord } from 'firebase-functions/lib/providers/auth'
import { db, auth } from '../config/firebase'
import { Celebrity } from '../types/celebrity'

const Celebrities = db.collection("celebrities")

export default class CelebrityService {
  static getCelebrity = async (
    id:string
  ):Promise<FirebaseFirestore.DocumentData | undefined> => {
    try{
      const data = await Celebrities.doc(id).get()
      return data.data()
    }catch(e){
      return undefined;
    }
  }

  static createCelebrity = async (
    celeb:Celebrity,
    password:string
  ): Promise<UserRecord|null> => {
    try {
      const {
        email,
        alias,
      } = celeb
      const user = await auth.createUser({
        displayName: alias,
        email,
        password
      })
      return user
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

}