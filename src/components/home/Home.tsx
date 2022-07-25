import React from 'react'
import { UserCard } from '../Cards/UserCard';
import { Repository } from '../repo/Repository';
import { MainAuthedUser } from './../../types/UserTypes';


interface HomeProps {
user:MainAuthedUser|undefined
token:string
}

export const Home: React.FC<HomeProps> = ({user,token}) => {
return (
 <div className='h-full w-full  flex-col '>
<div className='w-full '>
<UserCard user={user}/>
</div>
<div className='w-full h-full'>
<Repository token={token} username ={user?.login}/>
</div>

</div>
);
}
 



