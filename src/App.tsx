import { useState } from 'react'
import { useQuery } from 'react-query';
import { Routes, Route ,BrowserRouter} from "react-router-dom";

import './App.css'
import { Home } from './components/home/Home';
import { Toolbar } from './components/Navigation/Toolbar/Toolbar';
import { User } from './components/user/User';
import { MainAuthedUser } from './types/UserTypes';
import { getAuthedUserDetails } from './utils/githubapi';
import { Profile } from './components/profile/Profile';

function App() {
const token = "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" 
const authed_user = "https://api.github.com/user" 

const query = useQuery(['main-user',token],()=>getAuthedUserDetails(token,authed_user));
const user = query.data as MainAuthedUser
  return (
    <div className="h-screen w-screen scroll-bar ">
    <BrowserRouter basename="/gitpals">
        <div className="fixed top-[0px] w-[100%] z-60">
          <Toolbar user={query.data}/>
        </div>
        <div className="w-full h-full mt-20 ">
          <Routes>
            
            <Route path="/" element={ <Home user={user}/>} />
            <Route path="/profile" element={ <Profile user={user}/>} />
            <Route path="/user" element={ <User/>}/>
            
      </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
