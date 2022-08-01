import React from 'react'
import { MatchedUser } from '../../types/UserTypes';

interface ResultsListProps {
results:MatchedUser[]
}

export const ResultsList: React.FC<ResultsListProps> = ({results}) => {
return (
<div className='w-full flex-col-center bg-slate-200 overflow-y-scroll max-h-[60%]'>
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
