import "./itinerary-block.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import BottomUpModal from "@components/_common/BottomUpModal";
import AddSpotForm from "@components/WritePostPage/AddSpotForm";
import addBtn from "@assets/community/add_btn.svg";
import moveBtn from "@assets/community/move_btn.svg";
import xBtn from "@assets/icon/red_x.svg";
import { itineraryPostState } from "@services/store/community";

const ItineraryBlock = () => {
  const [post, setPost] = useRecoilState(itineraryPostState);
  const { kakao } = window;
  const contentRef = useRef<any>();
  const [map, setMap] = useState(null);
  const [btnText, setBtnText] = useState("delete");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // textarea 자동 높이 조절
  const handleResizeHeight = useCallback(() => {
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }, []);

  const handleChangeTitle = (event: any) => {
    //setTitle(event.target.value);
  };

  const handleChangeContent = (event: any) => {
    //setContent(event.target.value);
  };

  // delete 버튼 클릭
  const handleDeleteClick = () => {
    btnText === "delete" ? setBtnText("done") : setBtnText("delete");
  };

  // 모달 관련
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    // 장소 저장 추가 필요
    setIsModalOpen(false);
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map-spot");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 7,
      };
      setMap(new kakao.maps.Map(container, options));
    });
  }, []);

  return (
    <div className="itinerary-block-container">
      <div className="content-block-container">
        <input type="text" placeholder="Title" onChange={handleChangeTitle} />
        <div className="boundary-line"></div>
        <textarea
          ref={contentRef}
          placeholder="Write down what you're curious about."
          onInput={handleResizeHeight}
          onChange={handleChangeContent}
        />
      </div>

      <div className="itinerary-form-header">
        <div>Itinerary</div>
        <div
          className={`place-delete-btn ${btnText}`}
          onClick={handleDeleteClick}
        >
          {btnText}
        </div>
      </div>

      <div className="spot-list-container">
        {/* 선택한 장소가 없으면 add 버튼만 띄우기, 있으면 spot 버튼 가장 아래에 */}
        <div className="spot-item-container">
          <div className="spot-item">
            <div className="spot-num">1</div>
            <div className="spot-name">
              Place name name name name name name name name name name name name
            </div>
            <div className="spot-district">Yeondeungpo</div>
          </div>
          {btnText === "delete" ? <img src={moveBtn} /> : <img src={xBtn} />}
        </div>
        <div className="spot-distance-container">
          <div className="spot-line"></div>
          <div className="spot-distance">distance</div>
        </div>
        {/* 코스 리스트 여기까지 반복 */}
        <div className="spot-add-btn" onClick={handleOpenModal}>
          <img src={addBtn} />
          Add
        </div>
      </div>

      <BottomUpModal
        isModalOpen={isModalOpen}
        onClose={handleCloseModal}
        navbarHeight={56}
        isWhiteBackground={false}
      >
        <AddSpotForm onClose={handleCloseModal} />
      </BottomUpModal>

      <div id="map-spot"></div>
    </div>
  );
};

export default ItineraryBlock;
