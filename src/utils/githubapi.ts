


import axios from 'axios'

//get authed user , using personal access token 
export const getAuthedUserDetails=async(token:string,url:string)=>{

   const res = await axios({
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    // console.log("response == ",res)

    const user = res.data 
    console.log("authed user == ",user)
    return user
}


export const getAuthedUserFollowers=async(token:string,url:string)=>{
     const res = await axios({
            method: 'get',
            url: url,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
        // console.log("response == ",res)
    
        const user = res.data 
        console.log("authed user == ",user)
        return user
    }

export const followUser = async(username:string,token:string)=>{
    const res = await axios({
        method: 'put',
        url: `https://api.github.com/user/following/${username}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    console.log("response after follow == ",res)
}

export const unfollowUser = async(username:string,token:string)=>{
    const res = await axios({
        method: 'delete',
        url: `https://api.github.com/user/following/${username}`,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    console.log("response after follow == ",res)
}


export const getIsUserFollowingMe=async(token:string,me:string,them:string)=>{
    const res = await axios({
           method: 'get',
           url:`https://api.github.com/users/${me}/following/${them}`,
           headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json"
           },
       })
       console.log("response == ",res.status)
       if(res.status === 204){ 
        return true
       }else{
        return false
       }
    }
