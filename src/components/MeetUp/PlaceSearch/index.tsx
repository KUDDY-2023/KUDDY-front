import "./place-search.scss";
import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import SearchResultPlaceItem from "../SearchResultPlaceItem";

import useInput from "@utils/hooks/userInput";
interface Props {
  onSelectPlace: (placeName: string) => void;
  onCloseSearchForm: () => void;
}
export default function PlaceSearch({
  onSelectPlace,
  onCloseSearchForm,
}: Props) {
  const searchPlaceInput = useInput("");
  const [short, setShort] = useState(false);

  const _handleReqPlaceSearch = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
  ) => {
    event.preventDefault();
    console.log(searchPlaceInput.value);
    //searchPlaceInput.reset(); // input 비우기
    setShort(true);
  };

  let arr: any = [
    { id: 1, placeName: "asdfsdf" },
    { id: 1, placeName: "teqte" },
    { id: 1, placeName: "asfsdf" },
  ];

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      onCloseSearchForm(); // 장소 검색 창 닫기
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="place-search-style" ref={wrapperRef}>
      <div className="search-section" id={short ? "short-version" : ""}>
        <input type="text" {...searchPlaceInput} />
        <SearchIcon onClick={e => _handleReqPlaceSearch(e)} />
      </div>
      <div className="result-section">
        {!short || arr.length === 0 ? (
          <p id="no-result-text">Please enter the correct name.</p>
        ) : (
          arr.map((a: any) => (
            <SearchResultPlaceItem
              onSelectPlace={onSelectPlace}
              placeItem={a}
            />
          ))
        )}
      </div>
    </div>
  );
}
