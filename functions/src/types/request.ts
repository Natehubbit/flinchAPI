export interface Request {
    title:string,
    status:'pending' | 'success' | 'failed',
    fulfilledAt:string,
    celebrity:Transactor,
    recipientName:string,
    description:string,
    createdAt:string,
    cancelledAt:string,
    modifiedAt:string,
    charge:number,
    requestor:Transactor,
    occasion:string,
    instructions:string,
    video:Video,
    id?:string,
}

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