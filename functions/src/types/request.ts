export interface Request {
    id?: string;
    instructions?: string;
    recipient?: string;
    occasion?: string;
    requestor?: UserMeta;
    celebrity?: UserMeta;
    response?: RequestResponse;
    payment?: RequestPayment;
    status?: RequestStatus;
    price?: number;
    timestamp?: number;
}

export interface RequestPayment {
    id:string;
    amount:number;
    payed:boolean;
    timestamp:number;
}

export interface UserMeta {
    id:string;
    name:string;
    imageUrl?:string;
}

export interface RequestResponse {
    videoUri:string;
    duration:number;
    status:ResponseStatus;
    timestamp:number;
    thumbnailUri:string;
}
export interface ResponsePayload extends RequestResponse {
    id: string;
    celebrity: string;
    date: string;
    recipient: string;
    thumbnailUri: string;
}

export type ResponseStatus = 'pending'|'rejected'|'approved'


export interface Video {
    title:string,
    duration:number,
    type:string,
    size:string,
}

export interface Transactor {
    id:string,
    name:string,
}

export interface Review {
    rating:number,
    text:string,
    approve:boolean,
}

export type RequestStatus = 'urgent'|'failed'|'success'|'pending'
