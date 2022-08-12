import React from 'react'
import { MatchedUser } from '../../types/UserTypes';

interface ResultsListProps {
results:MatchedUser[]

}

export const ResultsList: React.FC<ResultsListProps> = ({results}) => {
return (
<div className='w-[100%] flex flex-col items-center bg-slate-200 max-h-[80%] overflow-y-scroll scroll-bar'>
{
results&&results.map((result,index)=>{
return (
<div key={index+result.id} 
className='w-[80%] h-12 m-1 font-medium  text-black flex-center border border-black'>{result.login}</div>
)})
}

 </div>
);
}
