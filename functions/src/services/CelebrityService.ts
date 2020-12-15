import { db } from '../config/firebase'

const Celebrities = db.collection("celebrities")

export default class CelebrityService {
  static getCelebrity = async (id:string):Promise<FirebaseFirestore.DocumentData | undefined> => {
    try{
      const data = await Celebrities.doc(id).get()
      return data.data()
    }catch(e){
      return undefined;
    }
  }
}