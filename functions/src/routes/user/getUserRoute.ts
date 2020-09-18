import * as functions from 'firebase-functions';
import UserService from '../../services/userService';

const getUser = functions.https.onRequest(async(request, response) => {
    if(request.method !== "GET") return
    try{
        const { id } = request.body
        const data = await UserService.getUser(id);
        response.status(200).json({
            data
        });
    }catch(e){
        console.log(e)
        response.status(404).json({
            data:null,
            error:e
        });
    }
});

export default getUser;