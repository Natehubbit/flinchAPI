import { db } from "../config/firebase";
import { Request } from "../types/request";

const Request = db.collection('requests');

export default class RequestService{
    static makeRequest = async (request:Request):Promise<Request> => {
        const {id} = await Request.add(request)
        return {...request, id}
    }

    static getRequest = async (id:string):Promise<Request|undefined> => {
        const data  = await Request.doc(id).get()
        console.log(data)
        return
        // return {...data.data(), id}
    }
}