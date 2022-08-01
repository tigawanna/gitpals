import React from "react";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

interface SearchBoxProps {
  keyword: { word: string };
  setKeyword: React.Dispatch<React.SetStateAction<{ word: string }>>
  action: () => any
  title:string
}

export const SearchBox: React.FC<SearchBoxProps> = ({ keyword, setKeyword , action,title }) => {
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
    <div className="w-full flex-col-center">
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
            <FaSearch />
          </IconContext.Provider>
        </button>
      </div>
    </form>
    </div>
  );
};
