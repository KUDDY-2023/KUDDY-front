import "./kuddys-pick-search-bar.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";

type SearchBarProps = {
  searchInput: string;
  setSearchInput: (value: any) => void;
  searchedWord: string;
  setSearchedWord: (value: any) => void;
};

const KuddysPickSearchBar = ({
  searchInput,
  setSearchInput,
  searchedWord,
  setSearchedWord,
}: SearchBarProps) => {
  const nav = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  const [isInitial, setIsInitial] = useState<boolean>(true);
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.current) input.current.blur();
    setIsInitial(false);
    setSearchedWord(searchInput);
  };
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  return (
    <>
      <div className="kuddyspicksearchbar-wrapper">
        <BackIcon onClick={() => nav("/")} />
        <div className="kuddyspicksearchbar-rect">
          <form onSubmit={handleSubmit}>
            <input
              value={searchInput}
              onChange={handleInput}
              placeholder={`Search Kuddy's Pick by title`}
              ref={input}
            />
            <button type="submit">
              <SearchIcon stroke="var(--color-black)" />
            </button>
          </form>
        </div>
      </div>
      {!isInitial && (
        <div className="kuddyspicksearchbar-text">
          searched by '{searchedWord}'
        </div>
      )}
    </>
  );
};

export default KuddysPickSearchBar;