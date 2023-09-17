import "./itinerary-block.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState } from "recoil";
import BottomUpModal from "@components/_common/BottomUpModal";
import AddSpotForm from "@components/WritePostPage/AddSpotForm";
import addBtn from "@assets/community/add_btn.svg";
import moveBtn from "@assets/community/move_btn.svg";
import xBtn from "@assets/icon/red_x.svg";
import customPin from "@assets/community/customPin.svg";
import { itineraryPostState } from "@services/store/community";
import { placeData } from "../AddSpotForm/placeData";

const ItineraryBlock = () => {
  const [itineraryPost, setItineraryPost] = useRecoilState(itineraryPostState);
  const { kakao } = window;
  const contentRef = useRef<any>();
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<any>([]);
  const [btnText, setBtnText] = useState("delete");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // textarea 자동 높이 조절
  const handleResizeHeight = useCallback(() => {
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }, []);

  const handleChangeTitle = (event: any) => {
    setItineraryPost({ ...itineraryPost, title: event.target.value });
  };

  const handleChangeContent = (event: any) => {
    setItineraryPost({ ...itineraryPost, content: event.target.value });
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
    addMarker(126.97722, 37.57861, 1);
  };

  // 마커 생성
  function addMarker(mapX: number, mapY: number, idx: number) {
    var placePosition = new kakao.maps.LatLng(mapY, mapX); // 임의
    var imageSize = new kakao.maps.Size(18, 22); // 마커 이미지의 크기
    var markerImage = new kakao.maps.MarkerImage(customPin, imageSize);
    var marker = new kakao.maps.Marker({
      position: placePosition, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map); // 지도 위에 마커 표출
    setMarkers([...markers, marker]); // 생성된 마커 추가

    // 커스텀 오버레이 (몇 번째 장소인지 표시)
    var content = '<div id="spot-num-custom">' + `${idx}` + "</div>";

    var customOverlay = new kakao.maps.CustomOverlay({
      map: map,
      position: placePosition,
      content: content,
      yAnchor: 1,
    });

    map.setCenter(new kakao.maps.LatLng(mapY, mapX));

    return marker;
  }

  // 마커 삭제
  function removeMarker(idx: number) {
    markers[idx].setMap(null);
    const newMarkers = markers.filter(
      (marker: any, index: number) => index !== idx,
    );
    setMarkers(newMarkers);
  }

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
          {btnText === "delete" ? (
            <img src={moveBtn} />
          ) : (
            <img src={xBtn} onClick={() => removeMarker(0)} />
          )}
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
