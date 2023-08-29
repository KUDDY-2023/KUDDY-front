import "./place-form.scss";
import { useState } from "react";

import PlaceSearch from "../PlaceSearch";
import useInput from "@utils/hooks/userInput";
import Modal from "@mui/material/Modal";

export default function PlaceForm() {
  const [search, setSearch] = useState(false);

  const placeInput = useInput("");

  const _onSelectPlace = (placeName: string) => {
    setSearch(false); // 끄기
    placeInput.setValue(placeName);
    // 선택된 장소 input에 넣기
  };

  const _onCloseSearchForm = () => {
    setSearch(false); // 끄기
  };
  return (
    <div className="place-form-style">
      <Modal
        open={search}
        onClose={_onCloseSearchForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PlaceSearch
          onSelectPlace={_onSelectPlace}
          onCloseSearchForm={_onCloseSearchForm}
        />
      </Modal>

      <div className="default-form">
        <div className="title">Place</div>
        <input
          className="form"
          onClick={() => setSearch(true)}
          type="text"
          {...placeInput}
        />
      </div>
    </div>
  );
}
