

const token = "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"
import axios from 'axios'
import { MainAuthedUser } from './../types/UserTypes';

export const getUserWithAuthToken=async()=>{
// const token = "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"

  const authed_user = "https://api.github.com/user"
    const res = await axios({
        method: 'get',
        url: authed_user,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    console.log("response == ",res)

    const user = res.data as MainAuthedUser 
    console.log("authed user == ",user)
    return user
}


