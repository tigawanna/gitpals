import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Routes, Route ,BrowserRouter} from "react-router-dom";

import './App.css'
import { Home } from './components/home/Home';
import { Toolbar } from './components/Navigation/Toolbar/Toolbar';
import { User } from './components/user/User';
import { MainAuthedUser } from './types/UserTypes';
import { getAuthedUserDetails } from './utils/githubapi';
import { Profile } from './components/profile/Profile';

const api = {
token: import.meta.env.VITE_TOKEN,
};import { TheirProfile } from './components/profile/TheirProfile';
import UserContext from './utils/context';


function App() {
 const authed_user = "https://api.github.com/user" 
const token = api.token


const query = useQuery(['main-user',token],()=>getAuthedUserDetails(token,authed_user));
const user = query.data as MainAuthedUser
console.log("main query",query)



if (query.isLoading) {
  return <div className="h-full w-full  flex-center ">Loading....</div>;
}

  return (
    <div className="h-screen w-screen scroll-bar ">

       <BrowserRouter basename="/gitpals">
        <div className="fixed top-[0px] w-[100%] z-60">
          <Toolbar user={query.data}/>
        </div>
        <div className="w-full h-full mt-20 ">
          <Routes>
            
            <Route path="/" element={ <Home user={user} token={token}/>} />
            <Route path="/profile" element={ <Profile user={user} token={token}/>} />
            <Route path="/profile/:id" element={ <TheirProfile token={token} ogUser={user}/>} />
            <Route path="/user" element={ <User/>}/>
            
        </Routes>
        </div>
      </BrowserRouter>
  
    </div>
  )
}

export default App
