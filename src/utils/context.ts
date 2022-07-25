import React from 'react';
interface TokenType{
token:string|undefined
updateToken: (token?: string) => void
}
const token_data:TokenType = { token:undefined, updateToken:(token?:string)=>{}}
const TokenContext = React.createContext(token_data);
export default TokenContext;

