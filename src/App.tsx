import { useState } from 'react'
import { Routes, Route ,BrowserRouter} from "react-router-dom";

import './App.css'
import { Home } from './components/home/Home';
import { Toolbar } from './components/Navigation/Toolbar/Toolbar';
import { User } from './components/home/user/User';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="h-screen w-screen scroll-bar bg-purple-500">
    <BrowserRouter basename="/gitpals">
        <div className="fixed top-[0px] w-[100%] z-60">
          <Toolbar/>
        </div>
        <div className="w-full h-full mt-16 ">
          <Routes>
            
            <Route path="/" element={ <Home/>} />
            <Route path="/user" element={ <User/>}/>
            
      </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
