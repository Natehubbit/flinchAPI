import * as functions from 'firebase-functions';
import UserService from '../../services/userService';
import { User } from '../../types/user';

const addUserRoute = functions.https.onRequest(async(request, response) => {
    if(request.method !== 'POST')response.status(400).end()
    try{
        const user:User = request.body
        const data = await UserService.addUser(user);
        response.status(201).json({
            data
        })
    }catch(e){
        console.log(e)
        response.status(404).json({
            data:null,
            error:e
        })
    }
    
});

export default addUserRoute;