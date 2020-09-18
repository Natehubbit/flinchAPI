import { db } from "../config/firebase"
import users from "../data/user.json"
import celebs from "../data/celebrity.json"
import requests from "../data/request.json"


const Users = db.collection("users")
const Requests = db.collection("requests")
const Celebrities = db.collection("celebrities")

export default class MockService {
    static createUsers = ():void => {
        users.map(user => {
            Users.add(user)
        })
    }

    static createCelebrities = ():void => {
        celebs.map(celeb => {
            Celebrities.add(celeb)
        })
    }

    static createRequests = ():void => {
        requests.map(request => {
            Requests.add(request)
        })
    }

    static create = ():void => {
        MockService.createUsers();
        MockService.createCelebrities();
        MockService.createRequests();
    }

}