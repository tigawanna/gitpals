import React from 'react'
import { UserCard } from '../Cards/UserCard';
import { PersonProfile } from '../people/PersonProfile';
import { Repository } from '../repo/Repository';
import { MainAuthedUser } from './../../types/UserTypes';


interface HomeProps {
user:MainAuthedUser|undefined
token:string
}

export const Home: React.FC<HomeProps> = ({user,token}) => {
return (
 <div className='h-full w-full '>
    <div className='w-full '>
    <UserCard user={user} token={token} ogUser={user}/>
    </div>
    <div className='w-full h-full'>
    <Repository token={token} username ={user?.login}/>
    </div>
</div>
);
}
 



