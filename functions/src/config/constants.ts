import * as functions from 'firebase-functions'

export const PAYSTACK_TEST_KEY = functions.config().paystack.test_key
export const PAYSTACK_API = 'https://api.paystack.co/'
export const CHARGE_SUCCESS = 'charge.success'