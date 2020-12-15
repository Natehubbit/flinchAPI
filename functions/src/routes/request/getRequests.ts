import * as functions from 'firebase-functions';
import RequestService from '../../services/RequestService';


const getRequestRoute = functions.https.onRequest(async (request, response) => {
    if (request.method !== 'GET') 
    if(!request.params)
    response.status(400).json({
        data: null,
        error: 'bad request'
    })
    const {
        id
    } = request.params
    const data = await RequestService.getRequest(id);
    response.status(200).json({
        data,
        error:null
    })
});
export default getRequestRoute;