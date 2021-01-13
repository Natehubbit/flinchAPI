/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Axios, {AxiosRequestConfig} from 'axios'
import { PAYSTACK_API, PAYSTACK_TEST_KEY } from '../config/constants'
import { RefundData } from '../types/payment'

const INIT_URL = `${PAYSTACK_API}transaction/initialize`
const REFUND_URL = `${PAYSTACK_API}refund`

const CONFIG:AxiosRequestConfig = {
    headers:{
        "Authorization": `Bearer ${PAYSTACK_TEST_KEY}`,
        "Content-Type": "application/json",
    },
}

export default class PaymentService {
    static async initialize(
        data:Customer
    ):Promise<InitPaymentResponse|null> {
        try {
            const res = await Axios
                .post(
                    INIT_URL,
                    data,
                    CONFIG
                )
            return res.data.data
        } catch (error) {
            console.log(error.message)
            return null
        }
    }

    static async refund (data:RefundData) :Promise<any> {
        try {
            const res = await Axios
                .post(
                    REFUND_URL,
                    data,
                    CONFIG
                )
            return res.data.data
        } catch (e) {
            console.log(e.message)
            return null
        }
    }
}
