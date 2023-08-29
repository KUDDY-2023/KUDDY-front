import "./place-search.scss";
import { useState } from "react";
import { ReactComponent as SearchIcon } from "@assets/icon/search.svg";
import SearchResultPlaceItem from "../SearchResultPlaceItem";

import useInput from "@utils/hooks/userInput";
interface Props {
  onSelectPlace: (placeName: string) => void;
}
export default function PlaceSearch({ onSelectPlace }: Props) {
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

  return (
    <div className="place-search-style">
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
