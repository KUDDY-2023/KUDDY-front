import "./place-search.scss";
import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import SearchResultPlaceItem from "../SearchResultPlaceItem";
import { useGetSpotKeyWord } from "@services/hooks/spot";

import useInput from "@utils/hooks/useInput";
interface Props {
  onSelectPlace: (placeName: string, spotContentId: number) => void;
  onCloseSearchForm: () => void;
}
export default function PlaceSearch({
  onSelectPlace,
  onCloseSearchForm,
}: Props) {
  const searchPlaceInput = useInput("");
  const [short, setShort] = useState(false);
  const [spotArr, setSpotArr] = useState([]);
  const onSearchSpot = useGetSpotKeyWord();

  const _handleReqPlaceSearch = async () => {
    // event.preventDefault();
    console.log(searchPlaceInput.value);
    const res = await onSearchSpot(searchPlaceInput.value);

    console.log("⭐ 검색 결과", res);

    setSpotArr(res.spots); // 검색 결과 적용
    setShort(true);
  };

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
        <input type="text" {...searchPlaceInput} autoFocus />
        <SearchIcon onClick={_handleReqPlaceSearch} />
      </div>
      <div className="result-section">
        {!short || spotArr.length === 0 ? (
          <p id="no-result-text">Please enter the correct name.</p>
        ) : (
          spotArr.map((spot: any) => (
            <SearchResultPlaceItem
              onSelectPlace={onSelectPlace}
              placeItem={spot}
            />
          ))
        )}
      </div>
    </div>
  );
}
