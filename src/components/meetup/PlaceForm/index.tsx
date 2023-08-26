import "./place-form.scss";
import { useState } from "react";

import PlaceSearch from "../PlaceSearch";
export default function PlaceForm() {
  const [search, setSearch] = useState(false);

  return (
    <div className="place-form-style">
      {search ? (
        <PlaceSearch />
      ) : (
        <div className="default-form">
          <p>Place</p>
          <div onClick={() => setSearch(true)}></div>
        </div>
      )}
    </div>
  );
}
