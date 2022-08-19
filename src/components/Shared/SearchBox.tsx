import React from "react";
import { IconContext } from "react-icons";
import { FaSearch , FaTimes} from "react-icons/fa";
import { UseQueryResult } from "react-query";
import { SearchResult } from "../../types/UserTypes";
import { ResultsList } from "./ResultsList";

interface SearchBoxProps {
  keyword: { word: string };
  setKeyword: React.Dispatch<React.SetStateAction<{ word: string }>>;
  action: () => any;
  title: string;
  results: SearchResult;
  search_query: UseQueryResult<any, unknown>;
}

export const SearchBox: React.FC<SearchBoxProps> = (
  { keyword, setKeyword , action,title,results , search_query}) => {
  //  const size = useScreenSize(window.innerWidth, window.innerHeight); 
  //  //console.log("sie of screen = === ",size) 
  const handleChange = async (e: any) => {
    const { value } = e.target;
    setKeyword({
      ...keyword,
      [e.target.id]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    action()
  };
  return (
    <div className="w-full md:w-[60%] h-fit flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full flex-center">
        <div className="flex-center w-[80%] md:w-[50%] border-black border rounded-md">
          <input
            className="w-[100%]  p-[2px] md:p-1 mx-1 dark:bg-slate-700 transition duration-500"
            id="word"
            placeholder={title}
            onChange={handleChange}
            value={keyword.word}
            autoComplete={"off"}
          />
          <button type="submit">
            <IconContext.Provider
              value={{
                size: "20px",
                className: "mx-1",
              }}
            >
              {results?.total_count > 0 || keyword.word !== "" ? (
                <FaTimes />
              ) : (
                <FaSearch />
              )}
            </IconContext.Provider>
          </button>
        </div>
      </form>
      {keyword.word !== "" &&
      keyword.word.length > 2 &&
      !results?.items &&
      !search_query?.error &&
      !search_query?.isFetched ? (
        <div
          style={{ position: "fixed", top: "100px" }}
          className=" w-[90%] md:w-[50%]  flex-center h-[10%] fixed 
          top-[15%] bg-slate-200 dark:bg-slate-900 text-lg rounded transition duration-500"
        >
          searching....
        </div>
      ) : null}
      {search_query?.isFetched &&
      results?.total_count === 0 &&
      keyword.word !== "" ? (
        <div
          style={{ position: "fixed", top: "100px" }}
          className=" w-[90%] md:w-[50%]   flex-center h-[10%] 
          fixed top-[15%] bg-slate-200 dark:bg-slate-900 text-lg rounded transition duration-500"
        >
          no matches, try different key words
        </div>
      ) : null}
      {results?.total_count > 0 && keyword.word !== "" ? (
        <div
          style={{ position: "fixed", top: "100px" }}
          className=" w-[95%] md:w-[50%]   flex-center h-[70%] fixed top-[15%] "
        >
          <ResultsList results={results?.items} setKeyword={setKeyword} />
        </div>
      ) : null}
    </div>
  );
};
