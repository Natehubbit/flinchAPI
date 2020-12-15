import { User } from '../types/user'
import { db } from '../config/firebase'

const Users = db.collection('users');

export default class UserService {

  static getUser = async (id:string): Promise<User | undefined> => {
    try{
      const data = await Users.doc(id).get()
      return {...data.data()} as User
    }catch(e){
      console.log(e.message)
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