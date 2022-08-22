import React, { useContext, useState } from "react";
import { Navigate} from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa'
import { IconContext } from "react-icons";
import TokenContext from "../../utils/context";



interface LoginProps {

}


export const Login: React.FC<LoginProps> = () => {
  
  const [input, setInput] = useState({ token: ""});
  const [error, setError] = useState({ name:"", message:"" });

  const token = useContext(TokenContext);
   const handleChange = async (e: any) => {
          const { value } = e.target;
          setInput({
            ...input,
            [e.target.id]: value,
    });};


const handleSubmit = async (e: any) => {
   e.preventDefault();
   if(input.token === ""){
    setError({name:"token",message:"cannot be null"})
   }else{
    localStorage.setItem("user-token",JSON.stringify(input.token));
    token.updateToken(input.token)  
   }

  }; 

  const isError=()=>{
    if(error.name === "") return false
  return true}
    
  if(token.token){
  return <Navigate to='/' replace />
  }

  return (

    <div className=" w-full h-full flex justify-center items-center fixed top-12 bottom-0 
   z-50 bg-slate-200 dark:bg-slate-800">
      <IconContext.Provider value={{ size: "25px", className: "table-edit-icons" }} >
      <form className="w-[95%] md:w-[50%] p-3  rounded-lg text-white shadow-md
         shadow-purple-500 ">
        <div className="flex-col-center">
            <label className="text-lg font-bold text-black dark:text-white">Join</label>
          <input
            style={{borderColor:isError()?"red":""}}
            className="w-[80%] md:w-[80%] p-2 m-1 border-black
             text-black dark:text-white border rounded-sm dark:bg-black"
            id="token"
            placeholder="personal access token"
            onChange={handleChange}
            value={input.token}
          />
      {isError()?<div className="text-md p-1m-1 text-red-300">{error.message}</div>:null}
      <button 
      onClick={handleSubmit}
      className="p-2 m-1 w-[30%] bg-purple-800 shadow-md 
       hover:shadow-purple-400 rounded-md">Join</button>
      </div>
      </form>
      </IconContext.Provider>
    </div>
  );
};
