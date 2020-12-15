import { client } from "../config/algolia";
import * as functions from 'firebase-functions'

export default class SearchIndexService {
  static addObject (
    data:functions.firestore.QueryDocumentSnapshot,
    id:string,
    key:string
  ):boolean {
    try {
      const indexData = data.data()
      indexData.objectID = id
      const index = client.initIndex(key)
      index.saveObject(indexData)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
  
  static addObjects (
    data:FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>,
    key:string
  ):boolean {
    try {
      const arr = data.docs.map(d=>{
        const indexData = d.data()
        indexData.objectID = d.id;
        return indexData
      })
      const index = client.initIndex(key);
      index.saveObjects(arr)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static deleteObject (
    id:string,
    key:string
  ): boolean {
    try {
      const index = client.initIndex(key)
      index.deleteObject(id)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
}