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
          <div className="title">Place</div>
          <div className="form" onClick={() => setSearch(true)}></div>
        </div>
      )}
    </div>
  );
}
