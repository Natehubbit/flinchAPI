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
        return {...data.data(), id}
    }
    static async pay (
        id:string,
        amount:string,
        paymentId:string,
        ref:string,
        currency:string
    ):Promise<boolean> {
        try {
            await Request
                .doc(id)
                .update({
                    'payment.amount':amount,
                    'payment.payed':true,
                    'payment.trxRef':ref,
                    'payment.id':paymentId,
                    'payment.currency':currency
                })
            return true
        } catch (e) {
            console.log(e.message)
            return false
        }
    }
    static async update(
        id:string,
        payload:Partial<{key:keyof Request,data:Partial<Request>}>
    ):Promise<boolean|null> {
        try {
            const {key,data} = payload
            key && await Request
                .doc(id)
                .update({
                    [key]: data
                })
            return true
        } catch (e) {
            console.log(e.message)
            return null
        }
    }
}