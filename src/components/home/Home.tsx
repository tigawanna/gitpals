import React, { useEffect, useMemo,useState } from 'react'
import { getUserWithAuthToken } from './../../utils/githubapi';
import { useQuery } from 'react-query';

interface HomeProps {

}

export const Home: React.FC<HomeProps> = ({}) => {

const query = useQuery(['main-user'], getUserWithAuthToken);

console.log(query.data)
const user = query.data
return (
 <div className='h-full w-full bg-red-300'>
 Home
 <img
 src={user?.avatar_url}
 alt=""
 />
 </div>
);
}
 



