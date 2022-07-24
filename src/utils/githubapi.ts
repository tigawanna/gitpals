

const token = "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"
import axios from 'axios'


export const getAuthedUserDetails=async(token:string,url:string)=>{
// const token = "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"
   const res = await axios({
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    console.log("response == ",res)

    const user = res.data 
    console.log("authed user == ",user)
    return user
}


export const getAuthedUserFollowers=async(token:string,url:string)=>{
    // const token = "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"
       const res = await axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        console.log("response == ",res)
    
        const user = res.data 
        console.log("authed user == ",user)
        return user
    }

