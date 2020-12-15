export type User = {
    id:string;
    displayName:string;
    email:string;
    imageUrl:string;
    loggedIn:boolean;
    profileUpdated:boolean;
    isCelebrity:boolean;
    role:'celebrity'|'user';
    token: {
        data: string;
        type: string;
    }
};