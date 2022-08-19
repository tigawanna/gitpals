import {useState } from 'react'
import { useQuery } from 'react-query';
import { Routes, Route ,BrowserRouter} from "react-router-dom";
import './App.css'
import { Home } from './components/home/Home';
import { Toolbar } from './components/Navigation/Toolbar/Toolbar';
import { MainAuthedUser } from './types/UserTypes';
import { getAuthedUserDetails } from './utils/githubapi';
import { Profile } from './components/profile/Profile';


import TokenContext from './utils/context';
import { ProtectedRoute } from './components/auth/PrivateRoutes';
import { Login } from './components/auth/Login';
import { PersonProfile } from './components/people/PersonProfile';
import { useUserSearch } from './utils/hooks';
import { SearchBox } from './components/Shared/SearchBox';
import { Test } from './components/test/Test';


const api = {token: import.meta.env.VITE_TOKEN};
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
//console.log("main query",query)

const [keyword, setKeyword] = useState({ word: "" });
const {results, search_query} = useUserSearch(query_token, keyword.word);


const action = () => {
  //console.log("test query === ", keyword);
  setKeyword({word:""})
  // results.items = []
};



//console.log("resulat from search == ",results)
if (query.isLoading) {
  return <div className="h-full w-full  flex-center ">Loading....</div>;
}

  return (
    <div className="h-screen w-screen scroll-bar flex-col-center dark-styles">
      <BrowserRouter basename="/gitpals">
        <TokenContext.Provider value={{ token, updateToken }}>
          <div className="fixed top-[0px] w-[100%] z-50">
            <Toolbar
              user={query.data}
              updateToken={updateToken}
              token={query_token}
            />
            <div className="h-full w-[100%] mt-[3px] flex-col-center 
            font-normal bg-slate-50 dark:bg-slate-900">
              <SearchBox
                keyword={keyword}
                setKeyword={setKeyword}
                action={action}
                title={"email or username"}
                results={results}
                search_query={search_query}
              />
            </div>
          </div>

          <div className="w-full h-full mt-44 ">
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute token={token}>
                    <Home user={user} token={query_token} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute token={token}>
                    <Profile ogUser={user} token={query_token} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/personprofile"
                element={
                  <ProtectedRoute token={token}>
                    <PersonProfile token={query_token} ogUser={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<Test/>} />
            </Routes>
          </div>
        </TokenContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App
