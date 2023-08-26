import "./place-search.scss";
import { useState } from "react";

import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import SearchResultPlaceItem from "../SearchResultPlaceItem";

export default function PlaceSearch() {
  let arr: any = [1, 2, 3, 4, 5, 6, 7];

  const _handleReqPlaceSearch = () => {
    console.log("검색 요청");
  };
  return (
    <div className="place-search-style">
      <div className="search-secction">
        <input />
        <SearchIcon onClick={_handleReqPlaceSearch} />
      </div>
      <div className="result-secction">
        {arr.length === 0 ? (
          <p id="no-result-text">Please enter the correct name.</p>
        ) : (
          arr.map((a: any) => <SearchResultPlaceItem />)
        )}
      </div>
    </div>
  );
}
