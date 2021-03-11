import * as functions from 'firebase-functions'
import AuthService from '../../services/AuthService'

const deleteUserRoute = functions.https.onRequest(async (req, res): Promise<any> => {
  res.set ('Access-Control-Allow-Origin', '*')
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set ('Content-Type', 'application/json')
  try {
    const {id} = req.body
    await AuthService.deleteUser(id)  
    console.log('User deleted')
    return res.status(200).json({
      status: 200,
      msg: 'User Deleted'
    })
  } catch (e) {
    console.log(e.message)
    return res.status(400).json({
      status: 400,
      msg: 'Failed to Delete User'
    })
  }
})

export default deleteUserRoute
