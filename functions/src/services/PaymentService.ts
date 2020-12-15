/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Axios, {AxiosRequestConfig} from 'axios'
import { PAYSTACK_KEY } from '../config/constants'

const INIT_URL = 'https://api.paystack.co/transaction/initialize'
const CONFIG:AxiosRequestConfig = {
    headers:{
        "Authorization": `Bearer ${PAYSTACK_KEY}`,
        "Content-Type": "application/json",
    },
}

export default class PaymentService {
    static async initialize(data:Customer):Promise<InitPaymentResponse|null> {
        try {
            const res = await Axios.post(INIT_URL,data,CONFIG)
            return res.data.data
        } catch (error) {
            console.log(error.message)
            return null
        }
    }
}

export interface Customer {
    amount:string;
    email:string;
    currency:'GHS'|'NGN'|'USD';
    callback_url:string;
    channels:'mobile_money'|'card';
}

export interface InitPaymentResponse {
    authorization_url: string;
    access_code: string;
    reference: string;
}