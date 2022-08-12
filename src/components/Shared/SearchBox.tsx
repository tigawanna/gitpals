import React from "react";
import { IconContext } from "react-icons";
import { FaSearch , FaTimes} from "react-icons/fa";
import { UseQueryResult } from "react-query";
import { MatchedUser, SearchResult } from "../../types/UserTypes";
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
    <div className="w-full h-fit flex flex-col items-center bg-green-600">
      <form onSubmit={handleSubmit} className="w-full flex-center">
        <div className="flex-center w-[80%] md:w-[50%] border-black border rounded-md p-1">
          <input
            className="w-[100%]  p-1 mx-1"
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
      {search_query?.isLoading ? (
        <div className=" w-[50%]  flex-center h-[10%] fixed top-[15%] bg-green-500 text-lg rounded">
          loading....
        </div>
      ) : null}
      {search_query?.isFetched &&
      results?.total_count === 0 &&
      keyword.word !== "" ? (
        <div className=" w-[50%]  flex-center h-[10%] fixed top-[15%] bg-green-500  text-lg rounded">
          item not found , try different key words
        </div>
      ) : null}
      {results?.total_count > 0 && keyword.word !== "" ? (
        <div className=" w-[50%]  flex-center h-[70%] fixed top-[15%] bg-green-500">
          <ResultsList results={results?.items} />
        </div>
      ) : null}
    </div>
  );
};
