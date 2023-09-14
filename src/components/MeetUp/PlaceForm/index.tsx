import "./place-form.scss";
import { useState, useEffect } from "react";

import PlaceSearch from "../PlaceSearch";
import useInput from "@utils/hooks/useInput";
import Modal from "@mui/material/Modal";

import { useMakeMeetUpInfo } from "@services/hooks/chat";

export default function PlaceForm() {
  const onMakeMeetUpInfo = useMakeMeetUpInfo(); // meetup 전역 업데이트 훅

  const [search, setSearch] = useState(false); // place 모달 열기

  const placeInput = useInput("");

  const _onSelectPlace = (spotName: string, spotContentId: number) => {
    setSearch(false); // 끄기
    placeInput.setValue(spotName);
    onMakeMeetUpInfo({ spotName: spotName, spotContentId: spotContentId });
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
          value={placeInput.value}
        />
      </div>
    </div>
  );
}
