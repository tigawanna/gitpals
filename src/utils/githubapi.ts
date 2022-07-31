import axios from 'axios'
import { Follower, MainAuthedUser } from '../types/UserTypes'


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
    // console.log("authed user == ",user)
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
        // console.log("authed user == ",user)
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
    // console.log("response after follow == ",res)
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
    // console.log("response after follow == ",res)
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
        // console.log("response == ",res)
        if(res.status === 204){ 
         return true
        }
         return false
    }


    export const getAuthedUserFeed=async(token:string)=>{
        const res = await axios({
               method: 'get',
               url:` https://api.github.com/feeds`,
               headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
             },
           })
         const user = res.data 
        // console.log("authed user == ",user)
        return user
       }

export const getUserWithFollowingDetails = async (token: string, url: string, username: string) => {
        console.log("user with following details ", username, url);
        let followers:any=[]
         const users = await getAuthedUserFollowers(token,url) as Follower[]
    for await (const user of users) {
    // console.log("user with following details ",username,user.login);
         //@ts-ignore
             user.following_me = await getIsUserFollowingMe(token, username, user.login)
              
         .catch((e)=>{})
         followers.push(user)
         }
         return followers
        }
      
export const getUserWithFollowerDetails = async (token: string, url: string, username: string) => {

            let followers:any=[]
            const users = await getAuthedUserFollowers(token,url) as Follower[]
            for await (const user of users){
                // console.log("user with follower details ",username,user.login);
            //@ts-ignore
            user.following_me = await getIsUserFollowingMe(token,username,user.login)
            .catch((e)=>{})
            followers.push(user)
            }
            return followers
         }

         
//get authed user , using personal access token 
export const getAuthedUserRepository=async(token:string,url:string)=>{

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
     // console.log("authed user == ",user)
     return user
 }


export const  getRepositoryCommits =async(token:string,reponame:string,owner:string)=>{
    const url = ` https://api.github.com/repos/${owner}/${reponame}/commits`
    const res = await axios({
        method: 'get',
        url: url,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
}

 export const getUserByName=async(me:string,name:string,token:string)=>{
    const res = await axios({
        method: 'get',
        url:`  https://api.github.com/users/${name}`,
        headers: {
       Authorization: `Bearer ${token}`,
       "Content-Type": "application/json"
      },
    })
  const user = res.data 
  //@ts-ignore
  user.following_me = await getIsUserFollowingMe(token,me,user.login).catch((e)=>{})
  return user
 }
