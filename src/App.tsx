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
import TokenContext from './utils/context';
import { ProtectedRoute } from './components/auth/PrivateRoutes';
import { Login } from './components/auth/Login';
import { PersonProfile } from './components/people/PersonProfile';


let the_token:string|undefined
const local_token = localStorage.getItem("user-token");
if(local_token)
the_token = JSON.parse(local_token); 

function App() {
 const authed_user = "https://api.github.com/user" 
// const token = api.token

const [token, setToken] = useState<string|undefined>(the_token);
const updateToken = (new_token:string|undefined) => {setToken(new_token)};
const token_exists = token && token !==""

const query_token = token as string
const query = useQuery(['main-user',token],()=>getAuthedUserDetails(query_token,authed_user));
const user = query.data as MainAuthedUser
console.log("main query",query)



if (query.isLoading) {
  return <div className="h-full w-full  flex-center ">Loading....</div>;
}

  return (
    <div className="h-screen w-screen scroll-bar ">

       <BrowserRouter basename="/gitpals">
       <TokenContext.Provider  value ={{token,updateToken}}>
        <div className="fixed top-[0px] w-[100%] z-60">
          <Toolbar user={query.data} updateToken={updateToken}/>
        </div>
        <div className="w-full h-full mt-20 ">
          <Routes>
         
            <Route path="/" element={ 
               <ProtectedRoute token={token}>
                <Home user={user} token={query_token}/>
               </ProtectedRoute>
       }       />

       
            <Route path="/profile" element={ 
                 <ProtectedRoute token={token}>
                  <Profile ogUser={user} token={query_token}/>
                 </ProtectedRoute>
            } />
            <Route path="/profile/:id" element={ 
             <ProtectedRoute token={token}>
              <TheirProfile token={query_token} ogUser={user}/>
             </ProtectedRoute>
            } />

            <Route path="/personprofile" element={ 
             <ProtectedRoute token={token}>
              <PersonProfile token={query_token} ogUser={user}/>
             </ProtectedRoute>
            } />
            <Route path="/login" element={ <Login/>}/>
          
        </Routes>
        </div>
        </TokenContext.Provider>
      </BrowserRouter>
  
    </div>
  )
}

export default App
