import React from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  keyword: { word: string };
  setKeyword: React.Dispatch<React.SetStateAction<{ word: string }>>;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ keyword, setKeyword }) => {
  const handleChange = async (e: any) => {
    const { value } = e.target;
    setKeyword({
      ...keyword,
      [e.target.id]: value,
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="w-full p-1 flex-center">
      <div className="flex-center w-[80%] md:w-[50%] border-black border-2 rounded-md ">
        <input
          className="w-[100%]  p-2 m-1 "
          id="word"
          placeholder="type.."
          onChange={handleChange}
          value={keyword.word}
          autoComplete={"off"}
        />
        <button type="submit">
          <IconContext.Provider
            value={{
              size: "30px",
              className: "mx-1",
            }}
          >
            <FaSearch />
          </IconContext.Provider>
        </button>
      </div>
    </form>
  );
};
