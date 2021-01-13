export interface InitPaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface Customer {
  amount:string;
  email:string;
  currency:'GHS'|'NGN'|'USD';
  callback_url:string;
  channels:'mobile_money'|'card';
}
export interface RefundData {
  transaction: string;
  amount:number|string;
}

export interface Authorization {
  exp_month?: any;
  exp_year?: any;
  account_name?: any;
}

export interface Plan {
}

export interface Subaccount {
}

export interface Transaction {
  id: number;
  reference: string;
  amount: number;
  paid_at: Date;
  channel: string;
  currency: string;
  authorization: Authorization;
  customer: Customer;
  plan: Plan;
  subaccount: Subaccount;
  order_id?: any;
  paidAt: Date;
}
export interface RefundResponse {
  transaction: Transaction,
  integration: number;
  deducted_amount: number;
  channel?: any;
  merchant_note: string;
  customer_note: string;
  status: string;
  refunded_by: string;
  expected_at: Date;
  currency: string;
  domain: string;
  amount: number;
  fully_deducted: boolean;
  id: number;
  createdAt: Date;
  updatedAt: Date;
}