import React from 'react';

const user_data = { user:{}, updateUser:(user:any)=>{}}
const UserContext = React.createContext(user_data);
export default UserContext;

