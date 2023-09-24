import "./kuddys-pick-search-bar.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackIcon } from "@assets/icon/back.svg";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import { useRecoilState } from "recoil";
import { titleKeyword } from "@services/store/kuddyspick";

type SearchBarProps = {
  searchInput: string;
  setSearchInput: (value: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const KuddysPickSearchBar = ({
  searchInput,
  setSearchInput,
  onChange,
}: SearchBarProps) => {
  const nav = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  const [searchedWord, setSearchedWord] = useRecoilState(titleKeyword);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.current) input.current.blur();
    setSearchedWord(searchInput);
  };

  useEffect(() => {
    if (searchedWord) setSearchInput(searchedWord);
  }, [searchedWord]);

  return (
    <>
      <div className="kuddyspicksearchbar-wrapper">
        <BackIcon onClick={() => nav("/")} />
        <div className="kuddyspicksearchbar-rect">
          <form onSubmit={handleSubmit}>
            <input
              value={searchInput}
              onChange={onChange}
              placeholder={`Search Kuddy's Pick by title`}
              ref={input}
            />
            <button type="submit">
              <SearchIcon stroke="var(--color-black)" />
            </button>
          </form>
        </div>
      </div>
      {searchedWord !== "" && (
        <div className="kuddyspicksearchbar-text">
          searched by '{searchedWord}'
        </div>
      )}
    </>
  );
};

export default KuddysPickSearchBar;
