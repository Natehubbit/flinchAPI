import { User } from '../types/user'
import { db } from '../config/firebase'

const Users = db.collection('users');

export default class UserService {

  static getUser = async (id:string): Promise<FirebaseFirestore.DocumentData | undefined> => {
    try{
      const data = await Users.doc(id).get()
      return data.data()
    }catch(e){
      console.log(e)
    }
    return undefined
  }

  static addUser = async (user:User): Promise<User | null> => {
    try{
      const {id} = await db.collection('Users').add(user)
      return {...user,id}
    }catch(e){
      console.log(e);
    }
    return null
  }
}