import "./place-search.scss";
import React, { useRef, useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import SearchResultPlaceItem from "../SearchResultPlaceItem";
import { useGetSpotKeyWord } from "@services/hooks/spot";

import useInput from "@utils/hooks/useInput";

// 로딩
import Loading from "@components/_common/Loading";

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
    const res = await onSearchSpot(searchPlaceInput.value);
    setSpotArr(res.spots); // 검색 결과 적용
    setShort(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitReqPlaceSearch = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await onSearchSpot(searchPlaceInput.value);
    setSpotArr(res.spots); // 검색 결과 적용
    setShort(true);
    setIsLoading(false);
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
      {isLoading && (
        <Loading
          backColor="rgba(0, 0, 0, 0.0)"
          spinnerColor="#FFF798"
          size="80px"
        />
      )}

      <form
        className="search-section"
        id={short ? "short-version" : ""}
        onSubmit={e => onSubmitReqPlaceSearch(e)}
      >
        <input type="text" {...searchPlaceInput} autoFocus />
        <SearchIcon onClick={_handleReqPlaceSearch} />
      </form>
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
