import React from 'react'
import { MatchedUser } from '../../types/UserTypes';
import { useNavigate } from 'react-router-dom';

interface ResultsListProps {
  results: MatchedUser[];
  setKeyword: React.Dispatch<
    React.SetStateAction<{
      word: string;
    }>
  >;
}

export const ResultsList: React.FC<ResultsListProps> = ({results,setKeyword}) => {
return (
  <div className="w-[100%] md:w-[60%] h-full flex flex-col items-center  overflow-y-scroll scroll-bar ">
    {results &&
      results.map((result, index) => {
        return <ResultsCard result={result} setKeyword={setKeyword} />;
      })}
  </div>
);
}


interface ResultsCardProps {
  result: MatchedUser;
  setKeyword: React.Dispatch<
    React.SetStateAction<{
      word: string;
    }>
  >;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({result,setKeyword}) => {

 const navigate = useNavigate();
 const navigateToProfile = () => {
   setKeyword({word:""}) 
   navigate(`/personprofile`, { state: { dev:result } });
 };    
return (
  <div
    onClick={()=>navigateToProfile()}
    className="w-[100%]  m-[2px] p-1 bg-slate-100 dark:bg-slate-800  rounded-lg 
    shadow-slate-600 dark:shadow-white
  hover:bg-slate-200 dark:hover:bg-slate-900 shadow-sm flex cursor-pointer "
  >
    <img
      className="max-h-14  max-w-24  m-[2px] mr-2 rounded-[20%]"
      src={result?.avatar_url}
      loading="lazy"
      alt=""
    />
    <div className="w-[100%] h-12  flex-center text-base font-mono font-normal">
      {result.login}
    </div>
  </div>
);
}
